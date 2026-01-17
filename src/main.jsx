// src/index.js
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { UserProvider } from "./components/ui/UserContext";
import { ThemeProvider } from "./components/ui/ThemeContext";

// ────── RENDER APP ──────
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
    {/* <BrowserRouter> */}
    <UserProvider>
 <App />
    </UserProvider>
    </ThemeProvider>
     
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
