import React, { useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import { loadTransactions } from '../../store/actions/transactionsActions';
import { loadToys } from '../../store/actions/toysActions';
import transactionDifference from '../../utils/transactionDifference';
import TransactionRow from "./TransactionRow/TransactionRow";

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
