const initialState = {
    list: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TRANSACTIONS_RECEIVED':
            return {
                ...state,
                list: action.transactions
            }
        default:
            return state
    }
}