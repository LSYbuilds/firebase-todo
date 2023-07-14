import React, { useState } from "react";
import { postTodo } from "../axios/axios";

const HalfForm = ({ halfData, setHalfData, hlgroup, hlname }) => {
  // 새로운 캐릭터 state 변수
  const [value, setValue] = useState("");

  //   const handleChange = e => {
  //     setValue(e.target.value);
  //   };

  //   const handleSubmit = e => {
  //     e.preventDefault();
  //     if (value === "" || value == " ") {
  //       alert("내용을 입력하세요!");
  //     }
  //   };

  //   const newHalf = {
  //     id: Date.now(),
  //     name: value,
  //     group: hlgroup,
  //   };
  //   setHalfData([...halfData, newHalf]);
  //   postTodo(newHalf);
  //   setValue("");
  return (
    <div>
      <form className="flex pt-2" style={{ display: "flex" }}>
        <input
          type="text"
          name="value"
          style={{ flex: "10", padding: "5px" }}
          value={value}
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

export default HalfForm;
