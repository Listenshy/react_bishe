import { Layout } from "antd";
import React from "react";
import "./Home.css";
import Bread from "../Breadcrumb";
import Sid from "../Sider";
import Head from "../Header";
// 子路由出口
import { Outlet } from "react-router-dom";

export default function Home() {
  const { Content } = Layout;

  return (
    <div>
      <Layout>
        {/* 头部 */}
        <Head />
        <Layout>
          {/* 侧边栏 */}
          <Sid />
          {/* 内容 */}
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            {/* 路由导航栏 */}
            <Bread />
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
