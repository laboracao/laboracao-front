import axios from 'axios';
import { useDispatch } from 'react-redux';
import React from 'react';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import {useSnackbar} from 'notistack';

const LoadingWrapper = styled('div')`
  display: block;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 11000000;
  top: 0px;
  left: 0px;
  background: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
`

const InterceptorHooks = () => {

  const dispatch = useDispatch();
  const handleLoadingDispatch = (loading) => {
    dispatch({ type: 'SET_LOADING', loading });
  }
  
  return {
    handleLoadingDispatch,
  }
}

const API = axios.create({
  // baseURL: process.env.REACT_APP_API,
  baseURL: 'http://localhost:8081',
  headers: {
    'Authorization': sessionStorage.getItem("token"),
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const LoadingComponent = ({loading}) => {

  const {handleLoadingDispatch} = InterceptorHooks();
  const {enqueueSnackbar} = useSnackbar();

  API.interceptors.request.use((config) => {
    handleLoadingDispatch(true);
    return config;
  });

  API.interceptors.response.use((config) => {
    handleLoadingDispatch(false);
    return config;
  }, (error) => {
    handleLoadingDispatch(false);
    enqueueSnackbar("Houve um erro inesperado, tente novamente em instantes.", {variant: "error"})
    return Promise.reject(error);
  })

  return loading && (
    <LoadingWrapper>
      <CircularProgress color="primary"></CircularProgress>
    </LoadingWrapper>
  )
}

// API.interceptors.response.use(function(config){
//   console.log("response");
//   return config;
// })

const setTokenInStorage = (token) => {
  sessionStorage.setItem("token", token);
}

const setIdInStorage = (id) => {
  sessionStorage.setItem("userid", id);
}

const setUserDataInStorage = (user) => {
  sessionStorage.setItem('userData', JSON.stringify(user));
}

const getUserDataInStorage = () => {
  return JSON.parse(sessionStorage.getItem('userData'));
}

const getTokenInStorage = () => {
  return getUserDataInStorage();
}

const getUserIdInStorage = () => {
  return sessionStorage.getItem("userid");
}

function decodeToken(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const data = JSON.parse(JSON.parse(jsonPayload).userDetails);

  sessionStorage.setItem("username", data.email);
  sessionStorage.setItem("permission", data.permission);

  return JSON.parse(JSON.parse(jsonPayload).userDetails);

};

function resetStorage() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("permission");
  sessionStorage.removeItem("userData");
  sessionStorage.removeItem("id");
}

export { API, LoadingComponent, setTokenInStorage, getTokenInStorage, decodeToken, resetStorage, setIdInStorage, getUserIdInStorage, setUserDataInStorage, getUserDataInStorage };