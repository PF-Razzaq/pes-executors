import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const isMobileScreen = window.innerWidth <= 768; // Adjust the threshold as needed

// Add a class to the body based on whether it's a mobile screen
if (isMobileScreen) {
  document.body.classList.add("sidenav-toggled");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();