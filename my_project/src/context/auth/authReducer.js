
import {
  REGISTER, LOG_IN, LOAD_USER, SIGN_OUT, AUTH_ERR, CLEAR_ERROR
} from '../types'

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER:
    case LOG_IN:
      return {
        ...state,
        isAuthenticated: true,
        token: payload,
        errors: null
      }
    case LOAD_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      }
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    case AUTH_ERR:
      return {
        ...state,
        errors: payload
      }
    case CLEAR_ERROR:
      return {
        ...state,
        errors: null
      }
    default:
      return state
  }
};


export default authReducer