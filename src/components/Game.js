import React, { useEffect, useRef } from "react";

const Game = () => {
  const script = useRef(null);

  useEffect(() => {
    if (!script.current) {
      script.current = document.createElement("script");
      script.current.src = "/duckhunt.js";
      script.current.async = true;
      document.querySelector(".game").appendChild(script.current);
    }
  }, []);

  return (
    <div className="game"></div>
  )
};

export default Game;
