const initialState = {
  list: [],
  newTransaction: {
    toys: [],
    type: 'incoming',
  },
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTIONS_RECEIVED':
      return {
        ...state,
        list: action.transactions ? action.transactions : [],
      };
    case 'UPDATE_TX_TYPE':
      return {
        ...state,
        newTransaction: {
          ...state.newTransaction,
          type: action.txType,
        },
      };
    case 'ADD_TOY_TO_TX':
      return {
        ...state,
        newTransaction: {
          ...state.newTransaction,
          toys: [
            ...state.newTransaction.toys.filter((item) => item.id !== action.toyId),
            {
              id: action.toyId,
              quantity: 1,
            },
          ],
        },
      };
    case 'UPDATE_TOYS_QUANTITY':
      return {
        ...state,
        newTransaction: {
          ...state.newTransaction,
          toys: [
            ...state.newTransaction.toys.filter((item) => item.id !== action.id),
            {
              id: action.id,
              quantity: +action.quantity,
            },
          ],
        },
      };
    case 'REMOVE_TOY_FROM_TX':
      return {
        ...state,
        newTransaction: {
          ...state.newTransaction,
          toys: [
            ...state.newTransaction.toys.filter((item) => item.id !== action.id),
          ],
        },
      };
    case 'NEW_TRANSACTION_RECEIVED':
      return {
        ...state,
        list: [
          ...state.list,
          action.transaction,
        ],
        newTransaction: initialState.newTransaction,
      };
    case 'RESET_NEW_TRANSACTION':
      return {
        ...state,
        newTransaction: initialState.newTransaction,
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }
};
