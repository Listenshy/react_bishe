import { Breadcrumb } from "antd";
import React from "react";
import { useLocation } from "react-router";

export default function Bread() {
  const [crumb, setCrumb] = React.useState([]);
  const Location = useLocation();
  React.useEffect(() => {
    setCrumb(Location.pathname.split("/"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   console.log(crumb);
  return (
    <div>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        {crumb.map((item, index) => {
          return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
    </div>
  );
}
