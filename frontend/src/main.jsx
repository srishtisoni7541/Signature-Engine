
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import App from "./App";
import "./index.css";
import store from "./store/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-right" autoClose={3000} />

  </Provider>
);
