import Cookies from 'universal-cookie'

import { requestLogin } from '../../services/authService'

export const login = (email, password) => async (dispatch) => {
    dispatch({
        type: 'AUTH_START',
    })

    const loginResult = await requestLogin(email, password) // .then

    if (loginResult.accessToken) {
        const expires = new Date(Date.now() + 24*3600000)
        const cookies = new Cookies()
        cookies.set('token', loginResult.accessToken, { expires })
        dispatch({
            type: 'AUTH_SUCCESS',
            token: loginResult.accessToken
        })
    } else {
        console.log(loginResult);
        dispatch({
            type: 'AUTH_FAIL',
            error: 1 ? loginResult.message : ''
        })
    }

    dispatch({
        type: 'AUTH_FINISH'
    })
}

export const logout = (token) => async (dispatch) => {
    const cookies = new Cookies()
    if (cookies.get('token') === token)
    cookies.remove('token')
    setTimeout(() => {
        dispatch({ type: 'AUTH_CANCEL' })
    }, 200);

}

export const updateForm = (fields) => {
    return {
        type: 'UPDATE_FORM',
        fields
    }
}