import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import firebase from "../firebase";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login } = useLogin();

  // Link가 아닌 ,NavLink , useNavigate;
  const navigate = useNavigate();
  // 로그인

  const onFinish = values => {
    console.log("Success:", values);
    try {
      login(values.email, values.password);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  // Modal 기능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white flex flex-col">
      <h2>Login</h2>
      {/* ANT디자인? */}

      {/* AntD Modal */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalMessage}</p>
      </Modal>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 18,
        }}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Email을 입력하세요",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력하세요",
              validator: async (_, password) => {
                if (!password || password.length < 6) {
                  return Promise.reject(new Error("At least 6 passengers"));
                }
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff", marginRight: "8px" }}
          >
            로그인
          </Button>

          <Button
            htmlType="button"
            style={{}}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>
      {/* 
       1.emotion을 활용하여 tag의 용도를 구분한다.
       2.css도 함께 적용한다. 
       */}
    </div>
  );
};

export default Login;
