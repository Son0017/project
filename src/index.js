import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

const locolSTorage = localStorage.getItem("userid")
  ? localStorage.getItem("userid")
  : "";
const sessionStorages = sessionStorage.getItem("admin")
  ? sessionStorage.getItem("admin")
  : "";
const reducer = (
  state = {
    users: null,
    userOne: locolSTorage,
    logPage: false,
    adminId: sessionStorages,
    category: null,
    categoryList: null,
    books: null,
    isPending: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "users":
      return { ...state, error: null, users: action.payload };
    case "oneUser":
      return { ...state, error: null, userOne: action.payload };
    case "logClose":
      return { ...state, logPage: false };
    case "logOpen":
      return { ...state, logPage: true };
    case "books":
      return { ...state, error: null, books: action.payload };
    case "categoryList":
      return { ...state, error: null, categoryList: action.payload };
    case "category":
      return { ...state, error: null, category: action.payload };
    case "adminId":
      return { ...state, error: null, adminId: action.payload };
    case "attachmentId":
      return { ...state, error: null, attachmentId: action.payload };
    case "isPending":
      return { ...state, error: null, isPending: action.payload };
    case "error":
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
};

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
