import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ToastProvider } from "@sberdevices/plasma-ui";

import reportWebVitals from "./reportWebVitals";
import { DeviceThemeProvider } from "@sberdevices/plasma-ui/components/Device"; // Типографика, имеющая размеры, зависимые от типа устройства
import { GlobalStyle } from "./GlobalStyle"; // Тема оформления (цветовая схема)
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <DeviceThemeProvider>
    <GlobalStyle />
    <Router>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Router>
  </DeviceThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
