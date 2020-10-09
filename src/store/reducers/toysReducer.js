const initialState = {
  items: [],
  editingItems: {},
  loading: true,
  newToy: {
    name: '',
    categoryId: '',
    quantity: 0,
    price: 0,
    description: '',
  },
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOYS_LOAD_START':
      return {
        ...state,
        loading: true,
      };
    case 'TOYS_RECEIVED':
      return {
        ...state,
        items: action.toys ? action.toys : [],
        loading: false,
        error: '',
      };
    case 'TOYS_LOADING_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'TOYS_REQUEST_FINISH':
      return {
        ...state,
        loading: false,
      };
    case 'INIT_TOY_EDITING':
      return {
        ...state,
        editingItems: !state.editingItems[action.item.id] ? {
          ...state.editingItems,
          [action.item.id]: action.item,
        } : state.editingItems,
      };
    case 'CREATE_FORM_UPDATED':
      return {
        ...state,
        newToy: {
          ...state.newToy,
          ...action.fields,
        },
      };
    case 'EDIT_FORM_UPDATED':
      return {
        ...state,
        editingItems: {
          ...state.editingItems,
          [action.editingId]: {
            ...state.editingItems[action.editingId],
            ...action.fields,
          },
        },
      };
    case 'TOY_ADDED':
      return {
        ...state,
        items: [
          ...state.items,
          action.toy,
        ],
        newToy: initialState.newToy,
      };
    case 'TOY_UPDATED':
      return {
        ...state,
        items: state.items.map((item) => ((item.id !== action.toy.id) ? item : action.toy)),
        editingItems: {
          ...state.editingItems,
          [action.toy.id]: null,
        },
      };
    default:
      return state;
  }
};
