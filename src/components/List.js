import React from "react";
import Listitem from "./Listitem";

const List = ({ todoData, setTododata }) => {
  return (
    <div>
      {todoData.map(item => (
        // key는 반복문에서 unique 해야한다.
        <Listitem
          key={item.id}
          item={item}
          todoData={todoData}
          setTododata={setTododata}
        />
      ))}
    </div>
  );
};

export default List;
