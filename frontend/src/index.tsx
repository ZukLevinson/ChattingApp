import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Dashboard from "./features/dashboard";
import Navbar from "./components/Navbar";

ReactDOM.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
  document.getElementById("root")
);
