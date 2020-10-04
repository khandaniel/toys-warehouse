import { requestApi } from './networkProvider'

export const requestLogin = async (email, password) => {
    const response = await requestApi('login', {email, password}, { method: 'POST' })

    return response
}