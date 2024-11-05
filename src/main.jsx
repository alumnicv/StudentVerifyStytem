import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import studentReducer from "./components/studentSlics.js";
import applicentReducer from "./components/applientSlice.js";
import fileReducer from "./components/fileSlice.js";

const store = configureStore({
  reducer: {
    studentId: studentReducer,
    appEmail: applicentReducer,
    file: fileReducer,
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
