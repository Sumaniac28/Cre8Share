import React from 'react'
import styles from './LoginForm.module.css'
function LogInForm() {
  return (
    <div className={styles.formContainer}>
      <div>
        <h2>Log In</h2>
        <p>
          Welcome back to Cre8Share.... <br /> Continue your journey 
        </p>
      </div>
      <form className={styles.form}>
        <label for="Email">Email</label>
        <input type="text" placeholder="Email" name="Email" required />
        <label for="Password">Password</label>
        <input type="password" placeholder="Password" name="Password" required />
        <button>Log In</button>
        <a href="/login">New to our platform? <span>Create Account</span></a>
      </form>
     
    </div>
  )
}

export default LogInForm