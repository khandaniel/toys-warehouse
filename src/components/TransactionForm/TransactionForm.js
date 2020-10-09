import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell, TableFooter,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loadToys } from '../../store/actions/toysActions';
import {
  addToyToTx,
  removeToyFromTx,
  resetTransaction,
  selectTxType,
  submitTransaction,
  updateTxToysQuantity,
} from '../../store/actions/transactionsActions';

const TransactionForm = () => {
  const dispatch = useDispatch();
  const toys = useSelector((state) => state.toys.items);
  const newTx = useSelector((state) => state.transactions.newTransaction);
  const error = useSelector((state) => state.transactions.error);
  const { type: txType, toys: selectedToysTxs } = newTx;
  const selectedToysIds = selectedToysTxs.map((item) => item.id);
  const selectedToys = toys.filter((item) => selectedToysIds.includes(item.id));
  useEffect(() => {
    dispatch(loadToys());
  }, [dispatch]);
  const onTypeSelect = useCallback(({ target }) => {
    dispatch(selectTxType(target.value));
  }, [dispatch]);
  const onQuantityChange = useCallback((item, target) => {
    if (target.value > item.quantity && txType === 'outcoming') {
      return null;
    }
    dispatch(updateTxToysQuantity(item.id, target.value));
  }, [dispatch, txType]);
  const onDeleteTxToy = useCallback((id) => {
    dispatch(removeToyFromTx(id));
  }, [dispatch]);
  const onTxSubmit = useCallback(() => {
    dispatch(submitTransaction(newTx));
  }, [dispatch, newTx]);
  const onTxReset = useCallback(() => {
    dispatch(resetTransaction);
  }, [dispatch]);

  return (
    <Paper style={{ marginBottom: 20, padding: 20 }}>
      <Typography variant="h6">Create Transaction</Typography>
      <div>
        <InputLabel id="tx-type-select">Transaction Type:</InputLabel>
        <Select
          labelId="tx-type-select"
          value={txType}
          onChange={onTypeSelect}
          required
        >
          <MenuItem value="incoming">
            Incoming
          </MenuItem>
          <MenuItem value="outcoming">
            Outcoming
          </MenuItem>
        </Select>
        { !!selectedToys.length && (
          <TableContainer style={{ marginTop: 20 }}>
            <Table>
              <TableHead style={{ backgroundColor: '#AAAAFF' }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell colSpan={2}>Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedToys.map((item) => {
                  const selectedTxToy = selectedToysTxs.find((txToy) => txToy.id === item.id);

                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={selectedTxToy.quantity}
                          onChange={(e) => onQuantityChange(item, e.target)}
                          inputProps={{ min: 1, max: txType === 'outcoming' ? item.quantity : null }}
                        />
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.price * selectedTxToy.quantity}</TableCell>
                      <TableCell>
                        <Button onClick={() => onDeleteTxToy(item.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>
                    <strong>
                      Summary:
                    </strong>
                  </TableCell>
                  <TableCell>
                    <strong>
                      { selectedToysTxs.reduce((accumulator = 0, current) => {
                        const currentItem = selectedToys.find((item) => current.id === item.id);
                        const totalCost = currentItem ? current.quantity * currentItem.price : 0;

                        return accumulator + totalCost;
                      }, 0) }
                    </strong>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={onTxSubmit}
                    >
                      Create
                    </Button>
                    <Button
                      onClick={onTxReset}
                    >
                      reset
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
        <TransactionToySelect toys={toys.filter((item) => !selectedToysIds.includes(item.id))} />
        { !!error && error }
      </div>
    </Paper>
  );
};

export default TransactionForm;

const TransactionToySelect = ({ toys }) => {
  const dispatch = useDispatch();
  const [toySelectedId, setToySelectedId] = useState('');
  const onToySelect = useCallback(({ target }) => {
    setToySelectedId(target.value);
  }, []);
  const onToySelectConfirm = useCallback(() => {
    dispatch(addToyToTx(toySelectedId));
    setToySelectedId('');
  }, [dispatch, toySelectedId]);

  return (
    <div style={{ marginTop: 20 }}>
      <InputLabel id="tx-toy-select">Select a Toy:</InputLabel>
      <Select
        labelId="tx-toy-select"
        value={toySelectedId}
        onChange={onToySelect}
        style={{ minWidth: 100 }}
      >
        {toys.map((toy) => (
          <MenuItem key={toy.id} value={toy.id}>
            {toy.name}
          </MenuItem>
        ))}
      </Select>
      <Button
        onClick={onToySelectConfirm}
        disabled={!toySelectedId}
      >
        Select
      </Button>
    </div>
  );
};

TransactionToySelect.defaultProps = {
  toys: [],
};

TransactionToySelect.propTypes = {
  toys: PropTypes.arrayOf(PropTypes.object),
};
