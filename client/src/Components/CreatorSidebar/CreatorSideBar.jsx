import React from "react";
import styles from "./CreatorSideBar.module.css";
import appLogo from "../../assets/images/anotherLogo.png";
function CreatorSideBar() {
  return (
    <div className={styles.Container}>
      <div className={styles.SidebarContainer}>
        <img className={styles.margin10px} src={appLogo} alt="Cre8Share Logo" />
        <div id={styles.menu}>
          <span>
            <i class="fa-solid fa-house"></i>
          </span>
          <span>
            <i class="fa-solid fa-plus"></i>
          </span>
          <span>
            <i class="fa-solid fa-gear"></i>
          </span>
          <span>
            <i class="fa-solid fa-book"></i>
          </span>
          <span>
            <i class="fa-solid fa-phone"></i>
          </span>
        </div>
        <span id={styles.signOut}>
          <i class="fa-solid fa-right-from-bracket"></i>
        </span>
      </div>
    </div>
  );
}

export default CreatorSideBar;
