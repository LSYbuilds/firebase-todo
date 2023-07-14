import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";

const Home = ({ fbUid, setFBUid }) => {
  // html 태그를 참조해서 활용하고 싶다.
  const p = useRef(null);
  useEffect(() => {
    // useRef를 통해서 참조한 html 태그는 .current를 참조한다.
    anime({
      targets: p.current,
      // translateX: 0,
      // rotate: "10turn",
      // backgroundColor: "#FFF",
      // duration: 10000,
    });
  }, []);
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
            <p ref={p}>메인페이지</p>
          </>
        )}
      </h1>
    </div>
  );
};

export default Home;
