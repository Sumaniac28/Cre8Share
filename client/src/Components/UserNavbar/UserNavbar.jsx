import React from "react";
import styles from "./UserNavbar.module.css";
import anotherLogo from "../../assets/images/anotherLogo.png";
import { Outlet } from "react-router-dom";
function UserNavbar() {
  return (
    <>
      <div id={styles.NavContainer}>
        <div id={styles.AboutCompany}>
          <img src={anotherLogo} alt="Company Logo" />
          <h1>CRE8SHARE</h1>
        </div>
        <div id={styles.NavLinks}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Education</a>
          <a href="#contact">Contact</a>
        </div>
        <div id={styles.userName}>
          <h3>Hi, User</h3>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default UserNavbar;
