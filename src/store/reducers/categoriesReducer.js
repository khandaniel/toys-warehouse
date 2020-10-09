const initialState = {
  list: [],
  loading: false,
  newCategory: '',
  editing: {},
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORIES_REQUESTED':
      return {
        ...state,
        loading: true,
      };
    case 'CATEGORIES_RECEIVED':
      return {
        ...state,
        list: action.categories ? action.categories : [],
        loading: false,
        error: '',
      };
    case 'CATEGORIES_LOAD_FINISH':
      return {
        ...state,
        loading: false,
      }
    case 'NEW_CATEGORY_UPDATED':
      return {
        ...state,
        newCategory: action.name,
      };
    case 'NEW_CATEGORY_ADDED':
      return {
        ...state,
        list: [
          ...state.list,
          action.category,
        ],
        newCategory: '',
      };
    case 'CATEGORY_REMOVED':
      return {
        ...state,
        list: state.list.filter((category) => category.id !== action.id),
      };
    case 'EDIT_CATEGORY':
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.category.id]: action.category.name,
        },
      };
    case 'UPDATE_CATEGORY_NAME':
      return {
        ...state,
        editing: {
          ...state.editing,
          ...action.category,
        },
      };
    case 'SAVE_CATEGORY_NAME':
      return {
        ...state,
        list: state.list.map((category) => (category.id !== action.category.id
          ? category : action.category)),
        editing: {
          ...state.editing,
          [action.category.id]: null,
        },
      };
    case 'CATEGORIES_ERROR':
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }
};
