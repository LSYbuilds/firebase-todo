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
    { id: 3, title: "1회 실행", completed: true },
    { id: 4, title: "문자답장보내기", completed: true },
  ]);

  const handleRemoveClick = () => {
    setTododata([]);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-orange-200">
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
        <div className="flex justify-between mb-3">
          <h1 className="text-center w-3/4 text-2xl text-red-300  font-samibild">
            Firebase Todo-List
          </h1>
          <button
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400 text-[12px]"
            onClick={handleRemoveClick}
          >
            Delete All
          </button>
        </div>
        {/* 할일 목록 */}
        <List todoData={todoData} setTododata={setTododata} />
        {/* 할일 추가 */}
        <Form todoData={todoData} setTododata={setTododata} />
      </div>
    </div>
  );
}

export default App;
