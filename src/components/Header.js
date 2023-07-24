import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useFirebase";
import { useAuthContext } from "../hooks/useFirebase";
import { useSelector } from "react-redux";
const Header = () => {
  const { logout } = useLogout();
  const { user } = useSelector(state => state);
  // const { user } =useAuthContext();
  // const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  // fg 로그아웃
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="p-10 bg-orange-300 relative">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-black hover:text-orange-400">
          로고
        </Link>
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
              to={user ? "/todo" : "/login"}
              className={({ isActive }) => {
                return isActive
                  ? "text-orange-600 font-bold"
                  : "text-black font-bold";
              }}
            >
              TODO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chart"
              className={({ isActive }) => {
                return isActive
                  ? "text-orange-600 font-bold"
                  : "text-black font-bold";
              }}
            >
              CHART
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/schedule"
              className={({ isActive }) => {
                return isActive
                  ? "text-amber-100 font-bold"
                  : "text-black font-bold";
              }}
            >
              SCHEDULE
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upload"
              className={({ isActive }) => {
                return isActive
                  ? "text-orange-100 font-bold"
                  : "text-black font-bold";
              }}
            >
              UPLOAD
            </NavLink>
          </li>
        </ul>
        <div className="flex justify-center gap-5">
          {user ? (
            <div className="text-white flex flex-row gap-2 absolute right-0 top-7">
              {user.displayName}
              {user.email} {user.uid}
              <button
                onClick={handleLogout}
                className="text-white hover:text-orange-600"
              >
                로그아웃
              </button>
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
