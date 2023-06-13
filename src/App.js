import { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  console.log("App 랜더링");
  // 더미 데이터 일반변수
  const [todoData, setTododata] = useState([
    { id: 1, title: "일일수행", completed: true },
    { id: 2, title: "촬영 1회 하기", completed: true },
    { id: 3, title: "시뮬레이션 1회 실행", completed: true },
    { id: 4, title: "문자답장보내기", completed: true },
  ]);

  return (
    <>
      <div className="container">
        <div className="todo-block">
          <div className="title">
            <h1>할일 목록</h1>
          </div>
          {/* 할일 목록 */}
          <List todoData={todoData} setTododata={setTododata} />
          {/* 할일 추가 */}
          <Form todoData={todoData} setTododata={setTododata} />
        </div>
      </div>
    </>
  );
}

export default App;
