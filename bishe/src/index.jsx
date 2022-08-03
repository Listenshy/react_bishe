import React from "react";
import ReactDOM from "react-dom/client";
// 路由模式
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.min.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // <App />
  // </React.StrictMode>

  <BrowserRouter>
    <App />
  </BrowserRouter>
);
