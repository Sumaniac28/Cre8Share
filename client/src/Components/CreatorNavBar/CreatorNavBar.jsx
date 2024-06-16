import React from "react";
import styles from "./CreatorNavBar.module.css";
import appLogo from "../../assets/images/anotherLogo.png";

function CreatorNavBar({name,channelImage}) {
  return (
    <div className={styles.Container}>
      <div id={styles.App}>
        <img src={appLogo} id={styles.AppImage} alt="App logo" />
        <span id={styles.Appname}>CRE8SHARE</span>
      </div>
      <div id={styles.search}>
        <input type="text" placeholder="Search" />
        <i class="fa-solid fa-search"></i>
      </div>
      <div className={styles.AboutCreator}>
        <img src={channelImage} alt="Profile Pic" />
        <p>
          {name}
          <br />
          <span>YouTube Creator</span>
        </p>
      </div>
    </div>
  );
}

export default CreatorNavBar;
