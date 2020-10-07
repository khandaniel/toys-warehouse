import { routes } from '../config'

export default state => next => action => {
    const currentState = state.getState()

    if (!currentState.auth.token && window.location.pathname !== routes.auth) {
        window.location.href = routes.auth
    }

    return next(action)
}