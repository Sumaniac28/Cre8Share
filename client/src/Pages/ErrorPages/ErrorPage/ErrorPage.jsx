import React from "react";
import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

function ErrorPage({ errorCode, errorMsg }) {
  if (errorCode === 401) {
    errorMsg = "Unauthorized access";
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>{errorCode}</h1>
        <h2 className={styles.message}>{errorMsg}</h2>
        <p className={styles.description}>
          We deeply regret the error. Please try to check your credentials or re-login.
          <br />
          If the issue still persists, kindly{' '}
          <a href="mailto:support@example.com" className={styles.contactLink}>
            contact us
          </a>.
        </p>
        <Link to="/" className={styles.homeLink}>
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
