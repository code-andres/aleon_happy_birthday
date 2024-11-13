import { useEffect, useMemo, useRef, useState } from "react";

import { Bounce, Fade } from "react-awesome-reveal";

const Welcome = () => {
  const [audio] = useState(new Audio("/aleon_happy_brithay/audio/music.mp3"));
  const [bounce, setBounce] = useState(true);
  const [showBounce, setShowBounce] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showCassette, setShowCassette] = useState(false);
  const [showCassetteFade, setShowCassetteFade] = useState(true);
  const [showGame, setShowGame] = useState(false);
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
          setShowGame(true);
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

  const renderGame = useMemo(() => {
    return (
      <iframe
        src="/aleon_happy_brithay/game.html"
        className="game"
        style={{ margin: 0, padding: 0, width: "100vw", height: "100vh" }}
      />
    );
  }, []);

  if (showGame) {
    return renderGame;
  }

  return (
    <div className="welcome">
      {renderPressToContinue()}
      {showLoader && renderLoader()}
      {showCassette && renderCassette()}
    </div>
  );
};

export default Welcome;
