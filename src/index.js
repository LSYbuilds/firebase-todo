import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
// Provider 는 state에 접근 가능 한 영역을 지정
import { Provider } from "react-redux";

// 1.Redux Store 에서 관리할 초기 객체
const intialState = {
  user: null, // fb 로그인 정보 {email:"", uid:"", nickName:""}
  isAuthReady: false,
  errMessage: "", //에러 메세지
};
// 2.Reducer 함수 작성
// dispatch에 의해 전달된 액션을 이용하여 state를 업데이트
const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    // 이건 파이어베이스 유저 로그인 파악
    case "isAuthReady":
      return { ...state, user: action.payload };
    case "updateName":
      return { ...state, user: action.payload };
    case "updateEmail":
      return { ...state, user: action.payload };
    case "deleteUser":
      return { ...state, user: null };
    case "isError":
      return { ...state, errMessage: action.payload };
    case "kakaoLogin":
      console.log(action.payload);
      return { ...state, kakaoProfile: action.payload };
    case "kakaoLogout":
      return { ...state, kakaoProfile: null };
    case "kakaoOut":
      return { ...state, kakaoProfile: null };
    case "iskakaoReady":
      return { ...state, kakaoProfile: action.payload };
    default:
      return state;
  }
};
// 2.Store 생성
// 저장소 = createStore(리듀서함수, state 초기값)
const store = createStore(authReducer, intialState);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // store의 state를 사용할 범위 지정
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
