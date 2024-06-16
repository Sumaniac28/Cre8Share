import React from "react";
import styles from "./UserNavbar.module.css";
import appLogo from "../../assets/images/anotherLogo.png";
import investorProfile from "../../assets/images/UserProfile.jpg";
function UserNavbar({name}) {
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
      <div className={styles.AboutUser}>
        <img src={investorProfile} alt="Profile Pic" />
        <p>
          {name}
          <br />
          <span>Investor</span>
        </p>
      </div>
    </div>
  );
}

export default UserNavbar;
