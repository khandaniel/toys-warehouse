import requestApi from './networkProvider';

const route = 'transactions';

export const getTransactions = () => requestApi(route);

export const getTransaction = (id) => requestApi(`${route}/${id}`);

export const createTransaction = (transaction) => requestApi(route, transaction, 'POST');
