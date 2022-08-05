import { DownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Head() {
  const { Header } = Layout;
  const Navigate = useNavigate();
  // 头部

  const handleMenuClick = (e) => {
    e.item.props.demo(e);
  };
  const out = () => {
    Navigate("/login")
  };
  const change = () => {
    console.log(222);
  };
  const menu = (
    <Menu
      items={[
        {
          label: "推出登录",
          key: "0",
          demo: out,
        },
        {
          label: "修改密码",
          key: "1",
          demo: change,
        },
      ]}
      onClick={handleMenuClick}
    />
  );
  return (
    <div>
      <Header className="header">
        <div className="headerName">大学生创新创业管理系统</div>
        <Dropdown overlay={menu} trigger={["click"]} className="headerDrop">
          <a onClick={(e) => e.preventDefault()} href="true">
            <Space>
              下拉菜单
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>
    </div>
  );
}
