import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";
import TodoChart from "./pages/TodoChart";
import Schedule from "./pages/Schedule";
import Upload from "./pages/Upload";
import { useActionData } from "react-router-dom";

import { useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  // 추후에 redux/Recoilstate로 관리 필요
  const [fbName, setFBName] = useState("");
  const [fbEmail, setFBEmail] = useState("");
  const [fbUid, setFBUid] = useState("");
  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="w-screen h-screen bg-stone-100 overflow-x-hidden">
      <Header />
      <div className="container h-full mx-auto">
        <Routes>
          {/* Navigate 를 이용한 강제 이동 */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={<Home fbUid={fbUid} setFBUid={setFBUid} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/todo"
            element={
              user ? (
                <Todo fbName={fbName} fbEmail={fbEmail} fbUid={fbUid} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/mypage"
            element={
              user ? (
                <MyPage
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/chart" element={<TodoChart />}></Route>
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
    // <>
    //   {isAuthReady ? (
    //     <div className="w-screen h-screen bg-stone-100 overflow-x-hidden">
    //       <Header />
    //       <div className="container h-full mx-auto">
    //         <Routes>
    //           {/* Navigate 를 이용한 강제 이동 */}
    //           <Route path="/" element={<Navigate to="/home" />} />
    //           <Route
    //             path="/home"
    //             element={<Home fbUid={fbUid} setFBUid={setFBUid} />}
    //           />
    //           <Route path="/about" element={<About />} />
    //           <Route
    //             path="/login"
    //             element={user ? <Navigate to="/home" /> : <Login />}
    //           />
    //           <Route path="/signup" element={<Signup />} />
    //           <Route
    //             path="/todo"
    //             element={
    //               user ? (
    //                 <Todo fbName={fbName} fbEmail={fbEmail} fbUid={fbUid} />
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />
    //           <Route
    //             path="/mypage"
    //             element={
    //               <MyPage
    //                 fbName={fbName}
    //                 fbEmail={fbEmail}
    //                 fbUid={fbUid}
    //                 setFBName={setFBName}
    //                 setFBEmail={setFBEmail}
    //                 y
    //                 setFBUid={setFBUid}
    //               />
    //             }
    //           />
    //           <Route path="/chart" element={<TodoChart />}></Route>
    //           <Route path="/schedule" element={<Schedule />} />
    //           <Route path="/upload" element={<Upload />} />
    //           <Route path="*" element={<NotFound />} />
    //         </Routes>
    //       </div>
    //     </div>
    //   ) : (
    //     "이게뭐냐 장난치냐 지금 나랑?"
    //   )}
    // </>
  );
}

export default App;
