import { useEffect, useRef, useState } from "react";

import { Bounce, Fade } from "react-awesome-reveal";
import Game from "../components/Game.js";

const Welcome = () => {
  const [audio] = useState(new Audio("/audio/music.mp3"));
  const [bounce, setBounce] = useState(true);
  const [showBounce, setShowBounce] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showCassette, setShowCassette] = useState(false);
  const [showCassetteFade, setShowCassetteFade] = useState(true);
  const bounceInterval = useRef(null);

  useEffect(() => {
    audio.volume = 0.3;
    audio.addEventListener("ended", () => audio.play());
    document.addEventListener('click', () => {
      audio.play();
      setShowLoader(true);
      setShowBounce(false);
      clearInterval(bounceInterval.current);
      setTimeout(() => {
        setShowLoader(false);
        setShowCassette(true);
        setTimeout(() => {
          setShowCassetteFade(false);
          document.location.href = "/game.html";
        }, 5000);
      }, 2500);
    }, { once: true });

    bounceInterval.current = setInterval(() => { 
      setBounce(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (bounce) {
      setTimeout(() => {
        setBounce(false);
      }, 1900);
    }
  }, [bounce]);

  const renderPressToContinue = () => {
    if (showBounce && bounce) {
      return (
        <Bounce duration={1000}>
          <div className="start">Presione para continuar</div>
        </Bounce>
      )
    } else {
      return null;
    }
  };

  const renderLoader = () => {
    return (
      <div className="loader-wrapper">
        <div className="loader-space">
          <div className="loader-loading"></div>
        </div>
      </div>
    )
  };

  const renderCassette = () => {
    return (
      <Fade reverse={!showCassetteFade} duration={3000}>
        <div className="cassette">
          <div className="head"></div>
          <div className="label">
            <div className="cutout">
              <div className="reel_hole">
                <div className="gear"></div>
              </div>
              <div className="reel_hole">
                <div className="gear"></div>
              </div>
              <div className="window">
                <div className="spool"></div>
                <div className="spool"></div>
              </div>
            </div>
          </div>
          <div className="accents">
            <div className="screw i1"></div>
            <div className="screw i2"></div>
            <div className="screw i3"></div>
            <div className="screw i4"></div>
            <div className="screw i5"></div>
            <div className="hole i1"></div>
            <div className="hole i2"></div>
            <div className="hole i3"></div>
            <div className="hole i4"></div>
          </div>
        </div>
      </Fade>
    )
  };

  return (
    <div className="welcome">
      {renderPressToContinue()}
      {showLoader && renderLoader()}
      {showCassette && renderCassette()}
    </div>
  );
};

export default Welcome;
