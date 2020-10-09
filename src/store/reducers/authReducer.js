import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('token');

const initialState = {
  token,
  isAuthorized: !!token,
  form: {
    email: '',
    password: '',
  },
  profile: {
    id: '',
    email: '',
  },
  profileError: '',
  loading: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          ...action.fields,
        },
      };
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        token: action.token,
        isAuthorized: true,
        form: {
          email: '',
          password: '',
        },
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        error: action.error,
      };
    case 'AUTH_FINISH':
      return {
        ...state,
        loading: false,
      };
    case 'AUTH_DISCARD':
      return {
        ...initialState,
        isAuthorized: false,
        token: '',
      };
    case 'PROFILE_RECEIVED':
      return {
        ...state,
        profile: action.profile,
      };
    case 'PROFILE_FETCH_FAILED':
      return {
        ...state,
        profileError: action.error,
      };
    default:
      return state;
  }
};
