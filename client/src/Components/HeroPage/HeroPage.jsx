import React from "react";
import styles from "./HeroPage.module.css";
import { Link } from "react-router-dom";
function HeroPage() {
  return (
    <>
      <div className={styles.Motocontainer}>
        <div className={styles.moto}>
          <span>We're here to help</span>
          <br />
          <span>you achieve</span>
          <br />
          <span id={styles.financially}>financial success</span>
        </div>
        <div className={styles.userMessage}>
          <p>
            Are you a user ? Join us for an amazing journey in achieveing
            financial freedom alongside supporting your favourite content
            creators.
          </p>
          <br />
          <div id={styles.joinContainer}>
            <Link to="/signup"><div id={styles.SignUp}>New? Let's begin</div></Link>
            <Link to="/login"><div id={styles.SignIn}>Log in to continue ↗</div></Link>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.CreatorsContainer}>
        <div id={styles.creator}>
          <p>
            Hey YouTube creators 👋🏻, ready to level up? Earn cash by the share!
            Join our revolution, where your channel's value is your currency.
            Let's make your content count and your wallet grow. Get in on the
            action now!
          </p>
          <button>
            Sign In with YouTube <i class="fa-brands fa-youtube"></i>
          </button>
        </div>
        <div className={styles.stats}>
          <div id={styles.stat1}>
            <p>
              <span>~462 million &nbsp;</span>(YouTube users in India)
            </p>
          </div>
          <div id={styles.stat2}>
            <p>
              <span>~2.71% &nbsp;</span>(YouTube's social media market share in
              India)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroPage;
