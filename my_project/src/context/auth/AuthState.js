import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import api from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import {
  REGISTER, AUTH_ERR, LOG_IN, LOAD_USER, SIGN_OUT, CLEAR_ERROR
} from '../types';
import { navigate } from '../../utils/navigationRef';

const AuthState = ({ children }) => {

  const initialState = {
    isAuthenticated: false,
    user: null,
    errors: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register a user
  const register = async (user) => {
    try {
      const res = await api.post('/auth/register', user);

      dispatch({
        type: REGISTER,
        payload: res.data.token
      });

      await AsyncStorage.setItem('token', res.data.token);

      getMe();

      navigate('mainFlow')

    } catch (error) {

      dispatch({
        type: AUTH_ERR,
        payload: error.response.data.error
      });

    }
  }

  // Login
  const login = async (user) => {
    try {
      const res = await api.post('/auth/login', user);

      dispatch({
        type: LOG_IN,
        payload: res.data.token
      });

      await AsyncStorage.setItem('token', res.data.token);

      getMe();

      navigate('mainFlow')

    } catch (error) {
      dispatch({
        type: AUTH_ERR,
        payload: error.response.data.error
      })

    }
  }

  // Local sign in
  const localSignIn = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {

      dispatch({
        type: LOG_IN,
        payload: token
      });

      getMe();

      navigate('mainFlow')
    } else {
      navigate('LogIn')
    }
  }

  // Load User
  const getMe = async () => {

    const token = await AsyncStorage.getItem('token');

    try {

      const res = await api.get('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      dispatch({
        type: LOAD_USER,
        payload: res.data.user
      })

      console.log(res.data.user);

    } catch (error) {
      console.log(error.response.data.error)

    }
  }

  // Sign Out
  const signOut = async () => {

    try {
      await AsyncStorage.removeItem('token');

      const token = await AsyncStorage.getItem('token');

      dispatch({
        type: SIGN_OUT
      });

      navigate('LogIn')

    } catch (error) {
      console.log(error)

    }

  }

  // Clear Error
  const clearErr = () => {
    dispatch({
      type: CLEAR_ERROR
    })
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        errors: state.errors,
        register,
        login,
        localSignIn,
        signOut,
        getMe,
        clearErr
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
