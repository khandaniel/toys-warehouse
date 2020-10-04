const initialState = {
  items: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCTS_RECEIVED':
      return {
        ...state,
        items: action.products
      }
    default:
      return state;
  }
}