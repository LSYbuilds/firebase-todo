import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useNavigate } from "react-router";

// FB 로그아웃
export const useLogout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      await signOut(appAuth);
      dispatch({ type: "logout" });
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
    // FB로그아웃 API
  };
  return { error, isPending, logout };
};
