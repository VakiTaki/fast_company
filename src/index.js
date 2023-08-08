import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist//css/bootstrap.css";
import { Router } from "react-router-dom";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import history from "./utils/histoty";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Router history={history}>
      <Provider store={store}>
         <App />
      </Provider>
   </Router>);

reportWebVitals();
