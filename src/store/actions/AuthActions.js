import React from "react";
//import { useNavigate } from "react-router-dom";

import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const CONNECTED_TO_METAMASK = "[Metamask action] connected to metamask";

export function signupAction(email, password, navigate) {
  return (dispatch) => {
    signUp(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(
          dispatch,
          response.data.expiresIn * 1000
          //history,
        );
        dispatch(confirmedSignupAction(response.data));
        navigate("/dashboard");
        //history.push('/dashboard');
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function Logout(navigate) {
  localStorage.removeItem("userDetails");
  navigate("/login");
  //history.push('/login');

  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(email, password, navigate) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, navigate);
        dispatch(loginConfirmedAction(response.data));
      
        navigate("/dashboard");
      })
      .catch((error) => {
      
        const errorMessage = formatError(error.response.data);
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(address,token,isAdmin) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: {address,token,isAdmin},
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function connectedToMetaMask(address,token,isAdmin) {
  return {
    type: CONNECTED_TO_METAMASK,
    payload: {address,token,isAdmin},
  };
}

//Create function for requesting to connect with MetaMask
export function connectToMetaMask(navigate,address, token) {
  return (dispatch) => {
    window.ethereum.enable().then((accounts) => {
  

      if(address ==="0x4fad12ed6776b85e55f06742787a494a8370e")
      {

        
        let tokenDetails = {
          token: token,
          expiresIn: 3600,
          walletaddress: address,
          isAdmin : true
        
        }
        saveTokenInLocalStorage(tokenDetails);
        dispatch(connectedToMetaMask(address,token,tokenDetails.isAdmin));
        navigate("/admindashboard");
      }

      else
      {

        let tokenDetails = {
          token: token,
          expiresIn: 3600,
          walletaddress: address,
          isAdmin : false
        
        }
        saveTokenInLocalStorage(tokenDetails);
        dispatch(connectedToMetaMask(address,token,false));
        navigate("/dashboard");
      }
      
    });
  };
}

//Create function for requesting to connect with MetaMask

