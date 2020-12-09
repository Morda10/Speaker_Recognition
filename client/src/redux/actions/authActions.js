import {
  SET_USER,
  SET_TOKEN,
  SET_USER_LOGOUT,
} from "../types";

import jwt_decode from "jwt-decode";

export const setUser = (token, user) => {
  return {
    type: SET_USER,
    userDetails: { id: user.id, username: user.username },
    payload: jwt_decode(token),
  };
};

export const setToken = (token) => {
  // localStorage.setItem("jwt", token);
  return {
    type: SET_TOKEN,
    payload: token,
  };
};


export const logout = () => {
  localStorage.removeItem("persist:root");
  return {
    type: SET_USER_LOGOUT,
    payload: null,
  };
};
