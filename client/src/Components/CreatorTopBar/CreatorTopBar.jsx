import React from 'react'
import styles from './CreatorTopBar.module.css'
import profilePic from "../../assets/images/unnamed.jpg";

function CreatorTopBar() {
  return (
    <div className={styles.Container}>
        <div id={styles.Appname}>CRE8SHARE</div>
        <div className={styles.AboutCreator}>
            <p>Sumit Grover
                <br/>
                <span>YouTube Creator</span>
            </p>
            <img src={profilePic} alt='Profile Pic'/>
        </div>
    </div>
  )
}

export default CreatorTopBar