import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  Paper, TableFooter,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loadTransactions } from '../../store/actions/transactionsActions';
import { routes } from '../../config';
import { loadToys } from '../../store/actions/toysActions';
import transactionDifference from '../../utils/transactionDifference';

const styles = {
  transactionRows: {
    incoming: {
      backgroundColor: '#AAFFAA',
    },
    outcoming: {
      backgroundColor: '#FFAAAA',
    },
  },
};

function Transactions() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);
  const toys = useSelector((state) => state.toys.items);
  const error = useSelector((state) => state.transactions.error);
  const { txId } = useParams();

  useEffect(() => {
    dispatch(loadTransactions());

    if (txId) {
      dispatch(loadToys());
    }
  }, [dispatch, txId]);

  const currentTransaction = txId ? transactions.find(({ id }) => id === txId) : null;
  const title = txId ? `Transaction: ${txId}` : 'Transactions';
  const diff = transactionDifference(txId, transactions);

  return (
    <div>
      <Typography variant="h6" gutterBottom component="div">
        { title }
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#AAAAFF' }}>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Toys</TableCell>
              <TableCell align="center">Total price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { !txId && transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            )) }
            { !!txId && currentTransaction && (
              <>
                <TransactionRow transaction={currentTransaction} />
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h6" component="div">
                      Warehouse balance:
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Toy Name</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        { toys && toys.map(({
                          id, name, category, quantity,
                        }) => {
                          const realQuantity = diff[id] ? quantity - diff[id] : quantity;
                          return (
                            <TableRow key={id}>
                              <TableCell>{name}</TableCell>
                              <TableCell>{category.name}</TableCell>
                              <TableCell>{realQuantity}</TableCell>
                            </TableRow>
                          );
                        }) }
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              </>
            ) }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} align="center">
                { (!transactions.length && !error) && <>No transaction yet.</> }
                { !!error && (
                <>
                  {`Couldn't load transactions (${error})`}
                </>
                ) }
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Transactions;

const TransactionRow = ({ transaction }) => (
  <TableRow
    key={transaction.id}
    style={styles.transactionRows[transaction.type]}
  >
    <TableCell>{transaction.type === 'incoming' ? '↦[___]' : '[___]↦'}</TableCell>
    <TableCell component="th" scope="row">
      <Link to={`${routes.transactions}/${transaction.id}`}>
        {transaction.date}
      </Link>
    </TableCell>
    <TableCell>{transaction.userId}</TableCell>
    <TableCell>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { transaction && transaction.toys.map((toy, idx) => (
            <TableRow key={transaction.id + toy.name + toy.category.name}>
              <TableCell>
                #
                {idx + 1}
              </TableCell>
              <TableCell>{toy.name}</TableCell>
              <TableCell>{toy.category.name}</TableCell>
              <TableCell>{toy.quantity}</TableCell>
              <TableCell>{toy.price}</TableCell>
              <TableCell>{toy.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableCell>
    <TableCell align="center">
      { transaction.toys.reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalCost,
        0,
      ) }
    </TableCell>
  </TableRow>
);

TransactionRow.defaultProps = {
  transaction: {},
};

TransactionRow.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    type: PropTypes.string,
    userId: PropTypes.string,
    toys: PropTypes.arrayOf(PropTypes.object),
  }),
};
