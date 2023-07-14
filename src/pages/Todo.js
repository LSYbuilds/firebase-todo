import React, { useEffect } from "react";
import { useState } from "react";
import List from "../components/List";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { axiosInstance, deleteAllTodo } from "../axios/axios";
import Loading from "../components/Loading";

const Todo = ({ fbName, fbEmail, fbUid }) => {
  const navigator = useNavigate();
  // 로딩처리
  const [isLoading, setIsLoading] = useState("true");
  // 백엔드반에 DB table 구성에 활용한다.
  // FB , MongoDB 에서는 Collection 구성에 활용한다?!
  console.log(fbName, fbEmail);
  // JsonServer 데이터 state 변수
  const initTodoData = [];
  const [todoData, setTodoData] = useState(initTodoData);

  const handleRemoveClick = () => {
    setTodoData([]);
    deleteAllTodo();
    // 로컬스토리지 초기화
    // localStorage.setItem("fbTodoData", JSON.stringify([]));
  };

  // const RemoveTodo = async(_id) => {
  //   try {
  //     const res = await axiosInstance.
  //   }
  // }

  const getTodo = async () => {
    try {
      const res = await axiosInstance.get("/todos");
      const result = res.data;
      // 문제가 무엇인가? true false 가 문자열로 들어옴
      const todosArr = result.map(item => {
        if (item.completed === "true") {
          item.completed = true;
        } else {
          item.completed = false;
        }
        return item;
      });
      setTodoData(todosArr);
      //
      // item.completed = JSON.parse(item.completed);
    } catch (error) {
      console.log(error);
    }
  };
  // uid가 없는 경우 로그인으로 바로 보내기
  useEffect(() => {
    getTodo(setTodoData, setIsLoading);
  }, []);
  return (
    <div className="flex justify-center items-start mt-5 w-full">
      {isLoading && <Loading />}
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
        <div className="flex justify-between mb-3">
          <h1 className=" text-center w-3/4 text-2xl text-pink-600 font-semibold">
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
        <List todoData={todoData} setTodoData={setTodoData} />
        {/* 할일 추가 */}
        <Form
          todoData={todoData}
          setTodoData={setTodoData}
          fbName={fbName}
          fbEmail={fbEmail}
        />
      </div>
    </div>
  );
};

export default Todo;
