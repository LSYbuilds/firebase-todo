// 리액트에 useContext hook을 사용
// AuthContext 의 state 및 dispatch 함수
// 가져와 커스텀 hook 정의

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// 가쟈오는 커스텀 hook의 정의
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
