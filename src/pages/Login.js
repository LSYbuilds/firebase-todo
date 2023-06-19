import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../firebase";
import { Button, Checkbox, Form, Input, Modal } from "antd";

const Login = ({ setFBEmail, setFBName, setFBUid }) => {
  // Link가 아닌 ,NavLink , useNavigate;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인

  const onFinish = async values => {
    // console.log("Success:", values);
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.Email, values.password);
      // 로그인 된 사용자 정보를 가지고 온다
      const user = firebase.auth().currentUser;
      console.log(user);
      setFBName(user.displayName);
      setFBEmail(user.email);
      setFBUid(user.uid);
      navigate("/");
      // navigate("/");
    } catch (error) {
      console.log(error.code);

      if (error.code === "auth/invalid-email") {
        setModalMessage("올바른 이메일 형식이 아닙니다.");
      } else if (error.code === "auth/wrong-password") {
        setModalMessage("올바르지 않은 비밀번호입니다.");
      } else if (error.code === "auth/user-not-found") {
        setModalMessage("가입되지 않은 사용자 입니다.");
      } else if (error.code === "auth/missing-email") {
        setModalMessage("이메일이 맞지않습니다.");
      } else {
        setModalMessage("로그인이 실패하였습니다.");
      }
      showModal();
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
