import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "*/*",
  },
});
// Todo Get 기능
const getTodo = async 함수 => {
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
    함수(todosArr);
    //
    // item.completed = JSON.parse(item.completed);
  } catch (error) {
    console.log(error);
  }
};
// Todo Post 기능
const postTodo = async newTodo => {
  try {
    const res = await axiosInstance.post("/todos", newTodo);
    const result = res.data;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
// Todo Put  기능
// Todo Petch
const patchTitleTodo = async (_id, editTitle) => {
  try {
    const res = await axiosInstance.patch(`/todos/${_id}`, {
      title: editTitle,
      completed: false,
    });
    const result = res.data;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  // .then(res => res.data)
  // .then(result => console.log(result))
  // .catch(error => console.log(error));
};

// completed
const patchCompleteTodo = async (_id, item) => {
  try {
    const res = await axiosInstance.patch(`/todos/${_id}`, {
      completed: item.completed,
    });
    const result = res.data;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// Todo 전체지우기 기능
const deleteAllTodo = async () => {
  try {
    const res = await axiosInstance.get("/todos");
    const result = res.data;
    // 문제가 무엇인가? true false 가 문자열로 들어옴
    todosArr.forEach(item => {
      deleteTodo(item.id);
    });
  } catch (error) {
    console.log(error);
  }
};

// Todo Delete 기능
const deleteTodo = async _id => {
  try {
    const res = await axiosInstance.delete(`/todos/${_id}`);
    const result = res.data;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export {
  axiosInstance,
  getTodo,
  patchTitleTodo,
  patchCompleteTodo,
  deleteTodo,
  postTodo,
  deleteAllTodo,
};
