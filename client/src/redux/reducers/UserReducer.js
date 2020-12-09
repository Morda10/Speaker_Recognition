import { createReducer, createAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";


export const setUser = createAction("setUser");
export const logout = createAction("logout");
export const setToken = createAction("setToken");
export const setIsAdmin = createAction("setIsAdmin");


const initialState = {
  user: null,
  token: null,
  isAdmin: false,
};

export const UserReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    state.user = jwt_decode(action.payload.user);
    // state.userDetails = action.payload.userDetails;
    return state;
  },
  [logout]: (state) => {
    localStorage.removeItem("persist:root");
    state = {
      user: null,
      token: null,
      isAdmin: false,
    };
    return state;
  },
  [setToken]: (state, action) => {
    state.token = action.payload.token;
    return state;
  },
  [setIsAdmin]: (state, action) => {
    console.log(action.payload.isAdmin)
    state.isAdmin = action.payload.isAdmin;
    return state;
  }
});
