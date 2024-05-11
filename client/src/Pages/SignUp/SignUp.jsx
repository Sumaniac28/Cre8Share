import React from "react";
import Cre8ShareLogoWithName from "../../assets/images/Cre8ShareLogoWithName.jpg";
import styles from "./SignUp.module.css";
import SignUpForm from "../../Components/SignUpForm/SignUpForm";

function SignUp() {
  return (
    <>
      <div className={styles.container}>
        <div id={styles.signUPContainer}>
          <img
            src={Cre8ShareLogoWithName}
            id={styles.logoimage}
            alt="Cre8ShareLogo"
          />
          <SignUpForm />
        </div>
      </div>
    </>
  );
}

export default SignUp;
