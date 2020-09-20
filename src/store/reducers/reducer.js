const initialState = {
  userToken: localStorage.getItem('bff-toys-token'),
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}