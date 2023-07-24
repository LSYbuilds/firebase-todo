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
import { useEffect, useState } from "react";
import { useAuthContext } from "./hooks/useFirebase";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "./firebase/config";
function App() {
  // // 등록된 앱의 JavaScript Key
  // const jsKey = process.env.REACT_App_KAKAO;
  // // 로그인 SDK는 한번만 초기화
  // // 중복 초기화 방지 코드
  // if (!window.Kakao.isInitialized()) {
  //   // JavaScript key를 인자로 주고 SDK 초기화
  //   window.Kakao.init(jsKey);
  //   // SDK 초기화 여부를 확인하자.
  //   console.log(window.Kakao.isInitialized());
  // }
  // // 추후에 redux/Recoilstate로 관리 필요
  // const { isAuthReady, user, errMessage, dispatch } = useAuthContext()

  // store에 저장된 state를 읽어온다.
  // 에러메세지 모달 관련

  // useSelector((state)) => state.isAitpReady);
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const { isAuthReady, user, errMessage } = useSelector(state => state);
  // 2. store 에 저장된 state를 업데이트(액션 만들어서 전달);
  const dispatch = useDispatch();

  // FB 인증 웹브라우저 새로 고침 처리
  useEffect(() => {
    onAuthStateChanged(appAuth, user => {
      // 로그인이 되었는지 파악
      // console.log("onAuthStateChanged", user);
      dispatch({ type: "isAuthReady", payload: user });
    });
  }, []);

  // 에러메시지 모달 관련
  const error = msg => {
    Modal.error({
      title: "This is a warning message",
      content: msg,
      onOk: handleOk,
      okButtonProps: { style: { background: "Red" } },
    });
  };

  useEffect(() => {
    // 에러메세지가 ""가 아니면
    if (errMessage !== "") {
      error(errMessage);
    }
  }, [errMessage]);

  const handleOk = () => {
    dispatch({ type: "isError", payload: "" });
  };
  const handleCancel = () => {
    dispatch({ type: "isError", payload: "" });
  };
  return (
    <div className="w-screen h-screen bg-stone-100 overflow-x-hidden">
      <Header />
      <div className="container h-full mx-auto">
        <Routes>
          {/* Navigate 를 이용한 강제 이동 */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/todo"
            element={user ? <Todo /> : <Navigate to="/login" />}
          />
          <Route
            path="/mypage"
            element={user ? <MyPage /> : <Navigate to="/login" />}
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
