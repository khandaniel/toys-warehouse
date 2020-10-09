import { createTransaction, getTransactions } from '../../services/transactionService';
import { loadToys } from './toysActions';

const transactionError = (error, dispatch) => dispatch({
  type: 'TRANSACTION_ERROR',
  error: error.message,
});

export const loadTransactions = () => (dispatch) => {
  getTransactions().then(({ transactions }) => {
    dispatch({
      type: 'TRANSACTIONS_RECEIVED',
      transactions,
    });
  }).catch((error) => transactionError(error, dispatch));
};

export const selectTxType = (txType) => ({
  type: 'UPDATE_TX_TYPE',
  txType,
});

export const addToyToTx = (toyId) => (dispatch) => {
  dispatch({
    type: 'ADD_TOY_TO_TX',
    toyId,
  });
};

export const updateTxToysQuantity = (id, quantity) => ({
  type: 'UPDATE_TOYS_QUANTITY',
  id,
  quantity,
});

export const removeToyFromTx = (id) => ({
  type: 'REMOVE_TOY_FROM_TX',
  id,
});

export const submitTransaction = (tx) => (dispatch) => {
  createTransaction(tx).then((txReceived) => {
    dispatch({
      type: 'NEW_TRANSACTION_RECEIVED',
      transaction: txReceived,
    });
    dispatch(loadToys());
  }).catch((error) => transactionError(error, dispatch));
};

export const resetTransaction = {
  type: 'RESET_NEW_TRANSACTION',
};
