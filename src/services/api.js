import axios from 'axios';
import { useDispatch } from 'react-redux';
import React from 'react';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import styled from 'styled-components';
import {useSnackbar} from 'notistack';
import moment from 'moment';
import Push from 'push.js';

const LoadingWrapper = styled('div')`
  display: block;
  width: 100%;
  // height: auto;
  position: fixed;
  z-index: 11000000;
  top: 0px;
  left: 0px;
  background: rgba(255,255,255,0.8);
  // display: flex;
  // align-items: center;
  // justify-content: center;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
`
let push;

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
  baseURL: process.env.REACT_APP_API,
  // baseURL: 'https://laboracao-back.herokuapp.com/',
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
    enqueueSnackbar("Sucesso.", {variant: "success"})
    return config;
  }, (error) => {
    handleLoadingDispatch(false);
    enqueueSnackbar("Houve um erro inesperado, tente novamente em instantes.", {variant: "error"})
    return Promise.reject(error);
  })

  return loading && (
    // <LoadingWrapper>
    //   <LinearProgress color="primary"></LinearProgress>
    // </LoadingWrapper>
    <LoadingWrapper>
      <LinearProgress color="primary"/>
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
};

const handleNotification = (message) => {
  Push.create(message)
};

let waterNotification = false;
let glEndNotification = false;
let glStartNotification = false;
let glMiddleNotification = false;

const pushNotification = (currentHour, gl_end, gl_middle, gl_start, waterPush) => {
  // console.log(currentHour);
  // console.log(gl_end);
  // console.log(gl_middle);
  // console.log(gl_start);
  // console.log(waterPush);

  if(gl_end && !glEndNotification){

  }

  if(gl_middle){
    
  }

  if(gl_start){
    
  }

  if(waterPush && !waterNotification){
    handleNotification("Beber água");
    waterNotification = true;
  }
}

const getPushNotification = (dayWeek = 'dom') => {

  // const {gl_List} = getUserDataInStorage();
  // const findedNotification = gl_List?.find((item) => {return item.day === dayWeek} );
  // const {gl_end, gl_middle, gl_start, water_schedule} = findedNotification;

  // push = setInterval(() => {
  //   const currentDate = moment(new Date()).format('HH:mm');
  //   const waterPush = water_schedule.find((item) => { return item === currentDate})
    
  //   pushNotification(
  //     currentDate,
  //     `${gl_end.hour}:${gl_end.minute}`,
  //     `${gl_middle.hour}:${gl_middle.minute}`,
  //     `${gl_start.hour}:${gl_start.minute}`,
  //     waterPush
  //   );

  // }, 1000);

}

const removePushNotification = () => {
  if(push){
    clearInterval(push);
  }
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

export {
  API,
  LoadingComponent,
  setTokenInStorage,
  getTokenInStorage,
  decodeToken,
  resetStorage,
  setIdInStorage,
  getUserIdInStorage,
  setUserDataInStorage,
  getUserDataInStorage,
  getPushNotification,
  removePushNotification
};