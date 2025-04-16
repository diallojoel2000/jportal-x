import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./scss/styles.scss";
import * as bootstrap from "bootstrap";
import "admin-lte/dist/css/adminlte.css";
import "admin-lte/dist/js/adminlte.min.js";
import { Provider } from "react-redux";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
