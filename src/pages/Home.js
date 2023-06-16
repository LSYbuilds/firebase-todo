import React from "react";

const Home = ({ fbUid, setFBUid }) => {
  return (
    <div className="p-6 mt-5 shadow rounded bg-white">
      <h1 className="w-full text-center text-lg text-black">
        {fbUid ? (
          <>
            <p>로그인이 성공적으로 되었습니다.</p>
            <p>환영합니다</p>
          </>
        ) : (
          <>
            <p>메인페이지</p>
          </>
        )}
      </h1>
    </div>
  );
};

export default Home;
