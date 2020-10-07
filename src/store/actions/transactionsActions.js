import {getTransactions} from '../../services/transactionService'

export const loadTransactions = () => dispatch => {
    getTransactions().then(({ transactions }) => {
        dispatch({
            type: 'TRANSACTIONS_RECEIVED',
            transactions
        })
    })
}