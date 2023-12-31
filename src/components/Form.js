import React, { useEffect, useState } from "react";
import { postTodo } from "../axios/axios";
import { useFireStore } from "../hooks/useFireStore";

const Form = ({ todoData, setTodoData, fbName, fbEmail, uid }) => {
  // FB store의 Collection 참조를 활용
  const { addDocument, response } = useFireStore("todo");

  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // 저기에 들어오는 값이 비어있는지 공백인지 뭔지 해야 하는데
    // 정규표현식이 들어가야 하기 떄문이다.
    // if (value === "" || value == " ") {
    //   alert("내용을 입력하세요!");
    // }
    // 형식 즉, 키명을 구조를 지켜줌.
    // const newTodo = {
    //   id: Date.now(),
    //   title: value,
    //   completed: false,
    //   author: fbName,
    //   email: fbEmail,
    // };
    // 웹 브라우어로 url데이터 전송을 막아야함.
    // A태그의 href를 막아주듯
    // 새로운 todo 객체를 만들어준다 그리고 저장하고 갱신한다.
    // todoData 에 추가

    // set 함수에서 setTodoDate 에서 state를 가지고 오기 위해서는
    // set 함수에 인자로
    // 콜백함수를 전달한다.\
    // setTodoData([...todoData, newTodo]);
    // setTodoData(prev => {
    //   return [...prev, newTodo];
    // });
    // 로컬스토리지 저장
    // localStorage.setItem("fbTodoData", JSON.stringify([...todoData, newTodo]));
    // asios poost 호출 dbtodolist 추가하기

    // axiosInstance
    //   .post("/todos", newTodo)
    //   .then(res => res.data)
    //   .then(data => console.log(data))
    //   .catch(error => console.log(error));
    // postTodo(newTodo);
    // 입력창 초기화

    // FB의 Collection 에 Document를 추가하낟,
    // Document 형식은 객체를 리터랄힌디.
    addDocument({ uid, title: value, completed: false });
    setValue("");
  };

  return (
    <div>
      <form
        className="flex pt-2"
        style={{ display: "flex" }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="value"
          style={{ flex: "10", padding: "5px" }}
          placeholder="할일 입력"
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        ></input>
        <input
          type="submit"
          style={{ flex: "1" }}
          value="입력"
          className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
        ></input>
      </form>
    </div>
  );
};

export default Form;
