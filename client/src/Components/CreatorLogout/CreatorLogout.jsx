import React from "react";
import styles from "./CreatorLogout.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreatorLogout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/creators/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const dashboardRedirect = () => {
    navigate("/creator");
  };

  return (
    <div id={styles.logoutContainer} style={{ color: "white" }}>
      <h1 id={styles.logoutHeading}>
        Hey Creator, are you sure do you want to logout ?
      </h1>
      <div id={styles.buttonContainer}>
        <button
          className={styles.logoutBtn}
          id={styles.success}
          onClick={handleLogout}
        >
          Yes, log me out
        </button>
        <button
          className={styles.logoutBtn}
          id={styles.reject}
          onClick={dashboardRedirect}
        >
          {" "}
          No, get back to dashboard
        </button>
      </div>
      <p id={styles.logOutPara}>
        We are extremely sad to let you go :( . But you can always remember that
        CRE8SHARE is all yours, you can still come back again.
      </p>
    </div>
  );
}

export default CreatorLogout;
