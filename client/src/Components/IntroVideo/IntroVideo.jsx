import React, { useEffect } from "react";
import introVideo from "../../assets/intro/cre8share intro.mp4";
import styles from "../IntroVideo/IntroVideo.module.css";
import Typed from "typed.js";

function IntroVideo({ showLogin, showSignup }) {
  const el = React.useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["CRE8SHARE"],
      typeSpeed: 150,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div
      id={styles.videoContainer}
      className={`${showSignup || showLogin ? styles.blur : ""}`}
    >
      <video
        src={introVideo}
        autoPlay
        muted
        preload="auto"
        loop
        id={styles.introVideo}
      ></video>
      <div class={styles.contentOverlay}>
        <p class={styles.videoText}>Welcome to the world of ...</p>

        <h1 class={styles.videoHeading} ref={el}></h1>

        <p id={styles.videoDescription}>
          Hola, youtube creators and their fans. Are you ready in bringing a
          revolution in world of content creation by supporting your favourite
          creators?
          <br />
          <br />
          Then you are at the right place.
        </p>

        <div class={styles.overlayBox}>
          <p>Scroll down for more</p>
          <div class={styles.scrollArrow}>&#x2193;</div>
        </div>
      </div>
    </div>
  );
}

export default IntroVideo;
