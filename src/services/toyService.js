import {requestApi} from './networkProvider'

const route = 'toys'

export const getToys = () => requestApi(route)

export const createToy = toy => requestApi(route, toy, 'POST')

export const getToy = id => requestApi(`${route}/${id}`)

export const replaceToy = (id, toy) => requestApi(`${route}/${id}`, toy, 'PUT')

export const updateToy = (id, toy) => requestApi(`${route}/${id}`, toy, 'PATCH')

export const deleteToy = id => requestApi(`${route}/${id}`, null, 'DELETE')