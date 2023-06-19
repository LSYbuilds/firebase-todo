import React, { useState } from "react";
import SignUpDiv from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
// firebase 연동
import firebase from "../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const [nickname, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const handleSignUp = async e => {
    e.preventDefault();
    try {
      // firebase 에 회원가입 하기
      let createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pw);
      // 회원 가입이 성공시 사용자 이름을 업데이트
      await createUser.user.updateProfile({
        displayName: nickname,
      });
      // 회원가입 성공시 로그인 창으로 이동
      navigate("/login");
      console.log("등록된 정보 : ", createUser.user);
      // 회원가입시 에러처리
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("현재 입력하신 이메일은 사용중인 이메일 입니다.");
      } else if (error.code == "auth/invalid-email") {
        alert("현재 입력하신 이메일은 유효하지 않습니다.");
      } else if (error.code == "auth/operation-not-allowed") {
        alert("Operation not allowed.");
      } else if (error.code == "auth/weak-password") {
        alert("비밀번호의 보안성이 취약합니다.");
      }
    }
  };

  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white flex flex-col">
      <h2>SignUp</h2>

      {/* <Form>
        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!"),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form> */}
      {/* 
       1.emotion을 활용하여 tag의 용도를 구분한다.
       2.css도 함께 적용한다. 
       */}
      <SignUpDiv>
        <form className="shadow bg-white rounded">
          <label htmlFor="">이름</label>
          <input
            type="text"
            required
            value={nickname}
            onChange={e => setNickName(e.target.value)}
            placeholder="이름을 입력해주세요"
          ></input>
          <label htmlFor="">이메일</label>
          <input
            type="email"
            required
            value={email}
            maxLength={20}
            minLength={2}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
          ></input>
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            required
            minLength={8}
            maxLength={16}
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          ></input>
          <label htmlFor="">비밀번호 확인</label>
          <input
            type="password"
            required
            value={pwConfirm}
            onChange={e => setPwConfirm(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          ></input>
          <div className="flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => handleSignUp(e)}
            >
              회원가입
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
            >
              취소
            </button>
          </div>
        </form>
      </SignUpDiv>
    </div>
  );
};

export default Signup;
