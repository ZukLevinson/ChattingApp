import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Dashboard from "./features/dashboard";
import { Provider } from "react-redux";
import { store } from "./state/store"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
