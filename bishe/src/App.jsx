import React from "react";
// import { Outlet } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import route from "./routes";

export default function App() {
  // 可理解为使用路由  （路由出口）
  const element = useRoutes(route);
  // console.log(element);
  return (
    <div>
      {/* <Outlet /> */}

      {element}
    </div>
  );
}
