import {
  createToy, getToys, updateToy,
} from '../../services/toyService';
import { createTransaction } from '../../services/transactionService';

export const loadToys = () => (dispatch) => {
  dispatch({
    type: 'TOYS_LOAD_START',
  });
  getToys().then(({ toys }) => {
    dispatch({
      type: 'TOYS_RECEIVED',
      toys,
    });
  }).catch((error) => dispatch({
    type: 'TOYS_LOADING_ERROR',
    error: error.message,
  })).finally(() => {
    dispatch({
      type: 'TOYS_REQUEST_FINISH',
    });
  });
};

export const initEditing = (item) => (dispatch) => {
  const { category, ...itemData } = item;
  const editingItem = {
    ...itemData,
    categoryId: category.id,
  };

  dispatch({
    type: 'INIT_TOY_EDITING',
    item: editingItem,
  });
};

export const updateEditToyForm = (fields, isNew, toyId = 0) => ({
  type: isNew ? 'CREATE_FORM_UPDATED' : 'EDIT_FORM_UPDATED',
  editingId: !isNew ? toyId : null,
  fields,
  isNew,
});

export const createToyAction = (toyNew) => (dispatch) => {
  const toy = {
    name: '',
    description: '',
    categoryId: '',
    ...toyNew,
    quantity: toyNew.quantity ? +toyNew.quantity : 0,
    price: toyNew.price ? +toyNew.price : 0,
    totalCost: toyNew.quantity ? toyNew.quantity * toyNew.price : 0,
  };
  createToy(toy).then((toyCreated) => {
    if (toy.quantity > 0) {
      createTransaction({
        type: 'incoming',
        toys: [
          {
            id: toyCreated.id,
            quantity: toy.quantity,
          },
        ],
      }).then(() => {
        updateToy(toyCreated.id, { quantity: toy.quantity }).then((toyUpdated) => {
          dispatch({
            type: 'TOY_ADDED',
            toy: toyUpdated,
          });
        });
      });
    } else {
      dispatch({
        type: 'TOY_ADDED',
        toy: toyCreated,
      });
    }
  });
};

export const updateToyAction = (item) => (dispatch) => {
  updateToy(item.id, item).then((toy) => {
    dispatch({
      type: 'TOY_UPDATED',
      toy,
    });
  });
};
