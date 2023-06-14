import React from "react";

const Listitem = ({ item, todoData, setTododata }) => {
  console.log("Listitem 랜더링", item);
  const btnStyle = {
    color: "#000",
    float: "right",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
  };
  const getStyle = _completed => {
    return {
      padding: "10px",
      textDecoration: _completed ? "line-through" : "none",
      color: "#fff",
    };
  };

  const handleClick = _id => {
    // 전달된 ID를 검색해서 목록에서 제거
    // 1. 전달된 id로 해당하는 목록 찾아서 제외
    // 2. 새로운 목록으로 갱신해서 화면 리랜더링
    // 3. 배열의 고차함수 중 filter를 사용
    const newTodoData = todoData.filter(item => item.id !== _id);
    setTododata(newTodoData);
  };

  const handleCompleteChange = _id => {
    let newTodoData = todoData.map(item => {
      if (item.id === _id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTododata(newTodoData);
  };

  return (
    <div className="flex items-center justify-between w-full mb-2 px-4 -py-1 text-gray-600 bg-gray-100 botder rounded">
      <div className="items-center" style={getStyle(item.completed)}>
        {/* defaultChecked : 체크박스에 기본체크 상태 설정 */}
        <input
          type="checkbox"
          defaultChecked={item.completed}
          onChange={() => handleCompleteChange(item.id)}
        />
        <span className="item-title">{item.title}</span>
      </div>
      <div className="items-center">
        <button style={btnStyle} onClick={() => handleClick(item.id)}>
          X
        </button>
      </div>
    </div>
  );
};
// 리랜더링 최적화 적용
export default React.memo(Listitem);
