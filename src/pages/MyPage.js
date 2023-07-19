import React, { useEffect, useState } from "react";
import { MyPageDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUpdateNickName } from "../hooks/useUpdateNickName";
import { useUpdateEmail } from "../hooks/useUpdateEmail";
import { useUpdatePass } from "../hooks/useUpdatePass";
import { useUserDelete } from "../hooks/useUserDelete";

const MyPage = () => {
  const { user } = useAuthContext();
  const { updateNickName } = useUpdateNickName();
  const { updateMail } = useUpdateEmail();
  const { updatePass } = useUpdatePass();
  const { userDelete } = useUserDelete();
  const [nickname, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pw, setPw] = useState("");

  const navigate = useNavigate();
  // AuthContext에 state의 user를 출력
  useEffect(() => {
    setNickName(user.displayName);
    setEmail(user.email);
  }, []);

  const handlerNickName = async e => {
    e.preventDefault();
    updateNickName(nickname);
  };
  const handlerEmail = async e => {
    e.preventDefault();
    updateMail(email);
  };
  const handlerPassword = async e => {
    e.preventDefault();
    updatePass(pw);
  };
  const handlerDelete = async e => {
    e.preventDefault();
    userDelete();
    // try {
    //   await user.delete();
    //   console.log("회원탈퇴");
    //   alert("회원탈퇴가 되었습니다.");
    //   setFBEmail("");
    //   setFBName("");
    //   setFBUid("");
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white flex flex-col">
      <h2>My Page</h2>
      {/* 
       1.emotion을 활용하여 tag의 용도를 구분한다.
       2.css도 함께 적용한다. 
       */}
      <MyPageDiv>
        <form>
          <div>
            <label htmlFor="">닉네임</label>
            <input
              type="text"
              required
              value={nickname}
              onChange={e => setNickName(e.target.value)}
              maxLength={10}
              minLength={2}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerNickName}
            >
              별칭 변경
            </button>
          </div>
          <div>
            <label htmlFor="">이메일</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerEmail}
            >
              이메일 변경
            </button>
          </div>

          <div>
            <label htmlFor="">비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              required
              minLength={8}
              maxLength={16}
            />
            <label htmlFor="">비밀번호 확인</label>
            <input
              type="password"
              value={pwConfirm}
              onChange={e => setPwConfirm(e.target.value)}
              required
              minLength={8}
              maxLength={16}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerPassword}
            >
              비밀번호 변경
            </button>
          </div>
          <div className="flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerDelete}
            >
              회원탈퇴
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
            >
              취소
            </button>
          </div>
        </form>
      </MyPageDiv>
    </div>
  );
};

export default MyPage;
