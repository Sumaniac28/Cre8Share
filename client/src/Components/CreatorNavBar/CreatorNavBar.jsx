import React from "react";
import styles from "./CreatorNavBar.module.css";
import profilePic from "../../assets/images/unnamed.jpg";
import appLogo from "../../assets/images/anotherLogo.png";

function CreatorNavBar() {
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
        <img src={profilePic} alt="Profile Pic" />
        <p>
          Sumit Grover
          <br />
          <span>YouTube Creator</span>
        </p>
      </div>
    </div>
  );
}

export default CreatorNavBar;
