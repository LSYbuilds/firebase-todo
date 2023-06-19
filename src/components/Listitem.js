import React, { useState } from "react";
import { patchTitleTodo, patchCompleteTodo, deleteTodo } from "../axios/axios";

const Listitem = ({ item, todoData, setTodoData }) => {
  // console.log("Listitem 랜더링", item);
  // 편집 상태 설정 state
  const [isEdit, setIsEdit] = useState(false);
  // 편집 상태 타이틀 설정 state
  const [editTitle, setEditTitle] = useState(item.title);
  const getStyle = _completed => {
    return {
      padding: "10px",
      textDecoration: _completed ? "line-through" : "none",
      color: "#fff",
    };
  };

  const handleDeleteClick = _id => {
    const newTodoData = todoData.filter(item => item.id !== _id);
    setTodoData(newTodoData);
    deleteTodo(_id);
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };
  const handleCancelClick = () => {
    setIsEdit(false);
  };
  const handleSaveClick = _id => {
    let newTodoData = todoData.map(item => {
      if (item.id === _id) {
        item.title = editTitle;
        item.completed = false;
      }
      return item;
    });
    setTodoData(newTodoData);

    patchTitleTodo(_id, editTitle);
    item.completed = false;
    setIsEdit(false);
  };

  const handleEditChange = e => {
    setEditTitle(e.target.value);
  };

  const handleCompleteChange = _id => {
    let newTodoData = todoData.map(item => {
      if (item.id === _id) {
        // 전달한 값 보관
        item.completed = !item.completed;
      }
      return item;
    });
    setTodoData(newTodoData);
    patchCompleteTodo(_id, { ...item });
  };

  if (isEdit) {
    // 편집중
    return (
      <div className="flex items-center justify-between w-full mb-2 px-4 -py-1 text-gray-600 bg-gray-100 botder rounded">
        <div className="items-center w-3/5">
          <input
            className="w-full px-3 py-2 mr-3  rounded"
            type="text"
            defaultValue={item.title}
            onChange={handleEditChange}
          />
        </div>
        <div className="items-center">
          <button className="px-4 py-2 float-right" onClick={handleCancelClick}>
            Cancel
          </button>
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleSaveClick(item.id)}
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    // 일반상태
    return (
      <div className="flex items-center justify-between w-full mb-2 px-4 -py-1 text-gray-600 bg-gray-100 botder rounded">
        <div className="items-center flex" style={getStyle(item.completed)}>
          {/* defaultChecked : 체크박스에 기본체크 상태 설정 */}
          <input
            type="checkbox"
            defaultChecked={item.completed}
            value={item.completed}
            onChange={() => handleCompleteChange(item.id)}
          />
          <span className="item-title ml-3 text-primary text-black ">
            {item.title}
          </span>
        </div>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleDeleteClick(item.id)}
          >
            Delete
          </button>
          <button className="px-4 py-2 float-right" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </div>
    );
  }
};
// 리랜더링 최적화 적용
export default React.memo(Listitem);
