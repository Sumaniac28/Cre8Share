import React from "react";
import styles from "./SignUpForm.module.css";
function SignUpForm() {
  return (
    <div className={styles.formContainer}>
      <div>
        <h2>Sign Up</h2>
        <p>
          Welcome to Cre8Share.... <br /> Register as a user and start your
          experience
        </p>
      </div>
      <form className={styles.form}>
        <label for="Name">Name</label>
        <input type="text" placeholder="Name" name="Name" required />
        <label for="Email">Email</label>
        <input type="text" placeholder="Email" name="Email" required />
        <label for="Password">Password</label>
        <input type="password" placeholder="Password" name="Password" required />
        <label for="Confirm Password">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="Confirm Password"
          required
        />
        <div id={styles.checkboxInput}>
          <input type="checkbox" name="terms" value="terms" required />
          <label for="terms">I agree to the terms and conditions</label>
        </div>
        <button>Create Account</button>
        <a href="/login">Already have an account? <span>Login</span></a>
      </form>
     
    </div>
  );
}

export default SignUpForm;
