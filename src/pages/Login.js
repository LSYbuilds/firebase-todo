import React, { useState } from "react";
import { LoginDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Link가 아닌 ,NavLink , useNavigate;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 로그인
  const handleLogin = e => {
    console.log(e.target);
    // Firebase 로그인 시도
  };

  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white flex flex-col">
      <h2>Login</h2>
      {/* 
       1.emotion을 활용하여 tag의 용도를 구분한다.
       2.css도 함께 적용한다. 
       */}
      <LoginDiv>
        <form className="shadow bg-white rounded">
          <label htmlFor="">이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            title="이메일을 입력하라니까?"
          ></input>
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
            maxLength={16}
            placeholder="비밀번호를 입력하세요"
            title="비밀번호를 모르면 비밀번호 찾기를 해라"
          ></input>
          <div className="flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => handleLogin(e)}
            >
              로그인
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              회원가입
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                console.log("비밀번호 찾기");
              }}
            >
              비밀번호 찾기
            </button>
          </div>
        </form>
      </LoginDiv>
    </div>
  );
};

export default Login;
