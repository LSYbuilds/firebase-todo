import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useReducer } from "react";
import { timestamp, appFireStore } from "../firebase/config";

// FB의 Store CRUD HOOK

// 초기값
const initState = {
  document: null, // 전송할 document
  isPending: false, // 네트워크 연결
  error: null, // 에러메시지
  success: false, // 작업완료
};

// state 업데이트 리듀서
const storeReducer = (state, action) => {
  switch (action.type) {
    case "isPending":
      return { isPending: true, document: null, error: null, success: false };
    case "addDoc":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    case "deleteDoc":
    case "updateCompleted":
    case "updateDoc":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

export const useFireStore = transaction => {
  // dispatch 를 통해서 reducer 실행
  const [response, dispatch] = useReducer(storeReducer, initState);

  // FB store 의 컬렉션을 먼저 참조한다.
  // 컬렉션( collection ) 은 폴더라고 생각하시면 됩니다.
  // const colRef = collection(appFireStore, 컬렉션이름);
  const colRef = collection(appFireStore, transaction);

  // document 추가 : 컬렉션에 문서추가
  const addDocument = async doc => {
    // 네트워크를 연결함을 표현
    dispatch({ type: "isPending" });
    try {
      //doc에는 {title:"내용",complted:false, createTime:시간}
      const createTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createTime });
      console.log("문서추가 실행");
      console.log(docRef);
      dispatch({ type: "addDoc", payload: docRef });
    } catch (err) {
      console.log(err.message);
    }
  };

  // document 삭제 : 컬렉션에 문서삭제
  const deleteDocument = async id => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await deleteDoc(doc(colRef, id));
      console.log("삭제했어요");
      dispatch({ type: "deleteDoc", payload: docRef });
    } catch (err) {
      console.log(err.message);
    }
  };

  //   completed 업데이트
  const updateCompletedDocument = async (id, flag) => {
    dispatch({ type: "isPending" });
    try {
      // FB의 doc 메서드는 한 개의 document를 선택한다.
      // doc(컬렉션(폴더),참조 아이디)
      // updateDoc(문서,{키:값})
      const docRef = await updateDoc(doc(colRef, id, { completed: flag }));
      // 이게 도무지 뭔지 모르겠다 이건..뭔 형태냐
      dispatch({ type: "updateCompleted", payload: docRef });
    } catch (err) {
      console.log(err.message);
    }
  };

  // title 업데이트 기능
  const updateTitleDocument = async (id, title) => {
    dispatch({ type: " isPending" });
    try {
      const docRef = await updateDoc(doc(colRef, id), { title: title });
      dispatch({ type: "updateDoc", payload: docRef });
    } catch (err) {
      console.log(err.message);
    }
  };

  // 외부 호출
  return {
    addDocument,
    deleteDocument,
    response,
    updateCompletedDocument,
    updateTitleDocument,
  };
};
