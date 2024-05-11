import React from 'react';
import styles from './Navbar.module.css';
import anotherLogo from '../../assets/images/anotherLogo.png';
function Navbar() {
  return (
    <div className={styles.Navbar}>
      <div className={styles.AboutCompany}>
        <img src={anotherLogo} alt="Company Logo" />
        <h1>CRE8SHARE</h1>
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Education</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className={styles.getStarted}>
        <a href="/signup">Get Started</a>
        </div>
    </div>
  )
}

export default Navbar