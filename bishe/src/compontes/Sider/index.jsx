import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";

export default function Sid() {
  const { Sider } = Layout;

  // 侧边栏
  function getItem(label, key, icon) {
    return {
      key,
      icon,
      label,
    };
  }
  const items2 = [
    getItem("教师管理", "1", <PieChartOutlined />),
    getItem("学生管理", "2", <DesktopOutlined />),
  ];
  const demo = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    // console.log(item, key, keyPath, selectedKeys, domEvent);
  };
  const handleClick = (e) => {
    // console.log(e);
  };
  return (
    <div>
      <Sider width={250} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={items2}
          theme="dark"
          onSelect={demo}
          onClick={handleClick}
        />
      </Sider>
    </div>
  );
}
