import React, { useEffect, useRef } from "react";
import { customRequestAnimationFrame } from "./requestAnimationFrame";
import "./App.css";

const App = () => {
  const ballRef = useRef();

  const moveBall = () => {
    const start = Date.now();

    customRequestAnimationFrame(function animateBall() {
      let interval = Date.now() - start;
      ballRef.current.style.top = interval / 3 + "px";
      if (interval < 1000) customRequestAnimationFrame(animateBall, 1);
    });
  };

  useEffect(() => {
    moveBall();
    setInterval(moveBall, 1000);
  }, []);

  return (
    <div>
      <img
        id="ball"
        alt="ball"
        ref={ballRef}
        src="https://img.icons8.com/officel/80/000000/football2--v2.png"
        className="circle"
      />
    </div>
  );
};

export default App;
