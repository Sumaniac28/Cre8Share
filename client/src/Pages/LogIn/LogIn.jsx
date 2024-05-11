import React from 'react'
import styles from './LogIn.module.css'
import Cre8ShareLogoWithName from "../../assets/images/Cre8ShareLogoWithName.jpg";
import LogInForm from '../../Components/LogInForm/LogInForm';
function LogIn() {
  return (
    <>
    <div className={styles.container}>
      <div id={styles.signINContainer}>
        <img
          src={Cre8ShareLogoWithName}
          id={styles.logoimage}
          alt="Cre8ShareLogo"
        />
        <LogInForm/>
      </div>
    </div>
  </>
  )
}

export default LogIn