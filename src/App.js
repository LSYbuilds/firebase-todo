import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
function App() {
  // console.log("App 랜더링")

  return (
    <div className="w-screen h-screen bg-gray-700 overflow-x-hidden">
      <Header />
      <div className="container h-full mx-auto">
        <Routes>
          {/* Navigate 를 이용한 강제 이동 */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
