import React, { useState } from "react";
import styles from "./SignUpForm.module.css";
import axios from "axios";

function SignUpForm({ onClose, onOpenLogin }) {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (formdata.password !== formdata.confirm_password) {
        alert("Passwords do not match");
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/users/signUp",
        formdata
      );
      console.log("User signed up successfully:", response.data);
      onOpenLogin();
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("User already exists, please login instead");
        return
      } else {
        console.error(err);
      }
    }
  }

  return (
      <div className={styles.formContainer}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <div>
          <h2>Sign Up</h2>
          <p>
            Welcome to Cre8Share.... <br /> Register as a user and start your
            experience
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label for="Name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formdata.Name}
            onChange={handleChange}
            required
          />
          <label for="Email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formdata.Email}
            onChange={handleChange}
            required
          />
          <label for="Password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formdata.Password}
            onChange={handleChange}
            required
          />
          <label for="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            value={formdata.ConfirmPassword}
            onChange={handleChange}
            required
          />
          <div id={styles.checkboxInput}>
            <input type="checkbox" name="terms" required />
            <label for="terms">I agree to the terms and conditions</label>
          </div>
          <button>Create Account</button>
          <div id={styles.loginLink}>
            Already have an account? <span onClick={onOpenLogin} >Login</span>
          </div>
        </form>
      </div>
  );
}

export default SignUpForm;
