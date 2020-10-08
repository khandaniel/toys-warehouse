import requestApi from './networkProvider';

const route = 'categories';

export const getCategories = () => requestApi(route);

export const createCategory = (name) => requestApi(route, { name }, 'POST');

export const getCategory = (id) => requestApi(`${route}/${id}`);

export const updateCategory = (id, name) => requestApi(`${route}/${id}`, { name }, 'PUT');

export const deleteCategory = (id) => requestApi(`${route}/${id}`, null, 'DELETE');
