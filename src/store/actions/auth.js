import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_sUCCESS,
    authData: authData
  }
}

export const authError = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    const authDate = {
      email: email,
      password: password,
      returnSecurityToken: true
    }
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDedSBEatyXo2zjQH33JP2-Fjqrf85Jqkc', authDate)
      .then(response => {
        console.log(response)
        dispatch(authSuccess(response.data))
      }).catch(error => {
        console.log(error)
        dispatch(authError(error))
      })
  }
}
