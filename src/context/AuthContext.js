import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// FB 인증 Context 를 생성함
// Context 생성 목적은 전역 상태정보 활용
// 상태정보 출력 및 수정
// Store(저장소이다_은행금고?)
const AuthContext = createContext();
// context 관리 리듀서 함수

// 원본 state를 받고 action의 상태를 따라서 통해 state를 업데이트 한다.
// action이 들어오는 형태는 항상 type이 들어오게 되고 action 의 값이
// 바뀔때마다 State가 바뀐다.
// action(요청서)을 처리하는 reducer 함수.
// reducer 함수형태로 action(요청서)를 처리하는 이유는.
// 원본(state)의 불변성을 지키고 원하는 데이터를 처리 후
// 원본(state)를 변경한다.

const authReducer = (state, action) => {
  // console.log("리듀서함수:", action);
  switch (action.type) {
    // 즉 이러한 login이라는 case 값이 들어오게 되면은 아래쪽 retrun으로
    // 반환하게 되어 state에 전달한다. action.payload를 값으로 전달한다.
    case "login": // state 를 갱신한다.
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };

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

    // 카카오 기능
    case "kakaoLogin":
      console.log(action.payload);
      return { ...state, kakaoProfile: action.payload };
    case "kakaoLogout":
      return { ...state, kakaoProfile: null };
    case "kakaoOut":
      return { ...state, kakaoProfile: null };
    case "iskakaoReady":
      return { ...state, kakaoProfile: action.payload };
    // dispatch{{type:"isError",payload:"비번오류"}}
    default:
      // 그대로 돌려준다.
      // 블레이드 픽업 중 드가자
      return state;
  }
};

// Context 를 구독(Subscribe) 하도록  Provider 를 생성
// children은 자식 컴포넌트
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // fb 로그인 정보 {email:"", uid:"", nickName:""}
    isAuthReady: false,
    errMessage: "", //에러 메세지
    kakaoProfile: null,
  });
  // FB 인증 웹브라우저 새로 고침 처리
  useEffect(() => {
    onAuthStateChanged(appAuth, user => {
      // console.log("onAuthStateChanged", user);
      dispatch({ type: "isAuthReady", payload: user, isAuthReady: true });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

// 이 친구를 값을 출력할 컴포넌트는 index.js 다 따라서
// children은 index.js가 된다 ( index.js 참조 )
