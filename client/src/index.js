import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { setUser, logout, setToken } from "./redux/actions/authActions";
import jwt_decode from "jwt-decode";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorker from './serviceWorker';


const persistStorage = JSON.parse(localStorage.getItem("persist:root"));
// console.log(persistStorage);

//load user when refresh
if (persistStorage && persistStorage.token !== null) {
  try {
    const currentTime = Date.now() / 1000;
    const t = persistStorage.token;
    // console.log(persistStorage.token);
    let decoded;
    decoded = jwt_decode(persistStorage.token);
    if (decoded.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/";
    } else {
      store.dispatch(setUser(persistStorage.token, persistStorage.userDetails));
      store.dispatch(setToken(t));
    }
  } catch (e) {
    console.log(e.message);
  }
}
ReactDOM.render(
<Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
