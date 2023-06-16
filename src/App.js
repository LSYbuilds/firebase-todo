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
import { useState } from "react";
function App() {
  // console.log("App 랜더링")
  // 추후에 redux/Recoilstate로 관리 필요
  const [fbName, setFBName] = useState("");
  const [fbEmail, setFBEmail] = useState("");
  const [fbUid, setFBUid] = useState("");

  return (
    <div className="w-screen h-screen bg-stone-100 overflow-x-hidden">
      <Header
        fbName={fbName}
        fbEmail={fbEmail}
        fbUid={fbUid}
        setFBName={setFBName}
        setFBEmail={setFBEmail}
        setFBUid={setFBUid}
      />
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
            element={
              <Login
                setFBName={setFBName}
                setFBEmail={setFBEmail}
                setFBUid={setFBUid}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/todo"
            element={<Todo fbName={fbName} fbEmail={fbEmail} fbUid={fbUid} />}
          />
          <Route
            path="/mypage"
            element={
              <MyPage
                fbName={fbName}
                fbEmail={fbEmail}
                fbUid={fbUid}
                setFBName={setFBName}
                setFBEmail={setFBEmail}
                setFBUid={setFBUid}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
