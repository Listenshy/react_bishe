import React from "react";
import { Button, Form, Input } from "antd";
import {
  //  useLocation,
  useNavigate,
} from "react-router-dom";
import "./index.css";

export default function Login() {
  // 配合useNavigate使用   接收路由参数
  // const { state } = useLocation();
  const Navigate = useNavigate();
  const Login = (values) => {
    // console.log("Success:", values, state);

    Navigate("/");
  };

  const Register = () => {
    Navigate("/register", {
      state: {
        name: "login",
      },
    });
  };

  return (
    <div className="login">
      <Form
        className="FormLogin"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={Login}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="密码"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            立即登录
          </Button>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Button type="primary" onClick={Register}>
            没有账号,立即注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
