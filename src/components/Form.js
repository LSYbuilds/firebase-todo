import React, { useState } from "react";

const Form = ({ todoData, setTododata }) => {
  console.log("Form 랜더링");
  // 새로운 할일 state 변수
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // 형식 즉, 키명을 구조를 지켜줌.
    const newTodo = { id: Date.now(), title: value, completed: false };
    // 웹 브라우어로 url데이터 전송을 막아야함.
    // A태그의 href를 막아주듯
    // 새로운 todo 객체를 만들어준다 그리고 저장하고 갱신한다.
    // todoData 에 추가
    setTododata([...todoData, newTodo]);
    setValue("");
  };

  return (
    <div>
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <input
          type="text"
          name="value"
          style={{ flex: "10", padding: "5px" }}
          placeholder="할일 입력"
          value={value}
          onChange={handleChange}
        ></input>
        <input type="submit" style={{ flex: "1" }} value="입력"></input>
      </form>
    </div>
  );
};

export default Form;
