import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import firebase from "../firebase";

const Header = ({
  fbName,
  fbEmail,
  fbUid,
  setFBName,
  setFBEmail,
  setFBUid,
}) => {
  const navigate = useNavigate();
  // fg 로그아웃
  const handleLogout = () => {
    firebase.auth().signOut();
    console.log("로그아웃");
    setFBName("");
    setFBEmail("");
    setFBUid("");
    navigate("/");
  };
  return (
    <header className="p-7 bg-orange-300 relative">
      <div className="flex items-center justify-between">
        <NavLink to="/" className="text-black hover:text-orange-400">
          로고
        </NavLink>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => {
                return isActive
                  ? "text-orange-600 font-bold"
                  : "text-black font-bold";
              }}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => {
                return isActive
                  ? "text-orange-600 font-bold"
                  : "text-black font-bold";
              }}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to={fbUid ? "/todo" : "/login"}
              className={({ isActive }) => {
                return isActive
                  ? "text-orange-600 font-bold"
                  : "text-black font-bold";
              }}
            >
              TODO
            </NavLink>
          </li>
        </ul>
        <div className="flex justify-center gap-5">
          {fbUid ? (
            <div className="text-white flex flex-row gap-2 absolute right-0 top-7">
              환영합니다{fbName} {fbEmail} {fbUid}
              <button onClick={handleLogout}>로그아웃</button>
              <Link to="/mypage" className="text-block">
                마이페이지
              </Link>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  return isActive
                    ? "text-orange-600 font-bold"
                    : "text-black font-bold";
                }}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) => {
                  return isActive
                    ? "text-orange-600 font-bold"
                    : "text-black font-bold";
                }}
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
