import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Link} from "react-router-dom";
import {routes} from "../../../config";
import PropTypes from "prop-types";
import React from "react";

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

export default TransactionRow;