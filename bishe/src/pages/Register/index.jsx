import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

export default function Register() {
  // 路由编程式跳转
  const Navigate = useNavigate();
  const { state } = useLocation();

  const onFinish = (values) => {
    console.log("Success:", values, state);
  };

  const Login = () => {
    // console.log(1234);
    Navigate("/login", {
      state: {
        title: "register",
      },
    });
  };

  return (
    <div className="Register">
      <Form
        className="FormRegister"
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="nickname"
          label="昵称"
          rules={[
            {
              required: true,
              message: "请输入昵称!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="username"
          label="账号"
          rules={[
            {
              required: true,
              message: "请输入账号!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
          hasFeedback
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请确认密码!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <Button type="primary" onClick={Login}>
            已有账号，立即登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
