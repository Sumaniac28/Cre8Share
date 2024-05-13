import React, { useState } from "react";
import styles from "./HeroPage.module.css";
import SignUpForm from "../SignUpForm/SignUpForm";
import LogInForm from "../LogInForm/LogInForm";
import Navbar from "../Navbar/Navbar";
function HeroPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const openSignupModal = () => {
    setShowSignup(true);
  };

  const openLoginModal = () => {
    setShowLogin(true);
  };

  const closeSignupModal = () => {
    setShowSignup(false);
  };

  const closeLoginModal = () => {
    setShowLogin(false);
  };
  return (
    <>
      <section className={`${showSignup || showLogin ? styles.blur : ""}`}>
        <Navbar />
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
              <div id={styles.SignUp} onClick={openSignupModal}>
                New? Let's begin
              </div>
              <div id={styles.SignIn} onClick={openLoginModal}>
                Log in to continue ↗
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.CreatorsContainer}>
          <div id={styles.creator}>
            <p>
              Hey YouTube creators 👋🏻, ready to level up? Earn cash by the
              share! Join our revolution, where your channel's value is your
              currency. Let's make your content count and your wallet grow. Get
              in on the action now!
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
                <span>~2.71% &nbsp;</span>(YouTube's social media market share
                in India)
              </p>
            </div>
          </div>
        </div>
      </section>

      {showSignup && <SignUpForm onClose={closeSignupModal} />}
      {showLogin && <LogInForm onClose={closeLoginModal} />}
    </>
  );
}

export default HeroPage;
