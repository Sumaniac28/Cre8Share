import React from "react";
import styles from "./UserInfo.module.css";
function UserInfo() {
  return (
    <div id={styles.UserInfoContainer}>
      <div id={styles.UserInfoCard}>
        <div className={styles.point} id={styles.statsPoint}></div>
        <h1>User Info</h1>
        <ul>
          <li>
            <span>UserID - </span>hg7hr4
          </li>
          <li>
            <span>Username -</span>Sumit Grover
          </li>
          <li>
            <span>Email -</span>sumitgrover656@gmail.com
          </li>
          <li>
            <span>ID type -</span>Investor
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserInfo;
