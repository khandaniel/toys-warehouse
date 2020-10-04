import Cookies from 'universal-cookie'

const cookies = new Cookies()

const initialState = {
  token: cookies.get('token'),
  form: {
    email: '',
    password: ''
  },
  loading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          ...action.fields
        }
      }
    case 'AUTH_START':
      return {
        ...state,
        loading: true
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        token: action.token,
        form: {
          email: '',
          password: ''
        }
      }
    case 'AUTH_FAIL':
      return {
        ...state,
        error: action.error
      }
    case 'AUTH_FINISH':
      return {
        ...state,
        loading: false
      }
    case 'AUTH_CANCEL':
      return {
        ...initialState,
        token: ''
      }
    default:
      return state;
  }
}