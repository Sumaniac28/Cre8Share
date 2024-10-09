import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LogInForm({ onClose, onOpenSignUp }) {
  let navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        `${apiUrl}/users/signIn`,
        formData,
        {
          withCredentials: true,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/user");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        alert("Invalid username or password");
        return;
      }
      console.error("Sign in failed:", error);
    }
  };
  return (
    <div className={styles.formContainer}>
      <button className={styles.closeBtn} onClick={onClose}>
        X
      </button>
      <div>
        <h2>Log In</h2>
        <p>
          Welcome back to Cre8Share.... <br /> Continue your journey
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label for="Email">Email</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label for="Password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button>Log In</button>
        <div id={styles.SignUpLink}>
          New to our platform?{" "}
          <span onClick={onOpenSignUp}>Create Account</span>
        </div>
      </form>
    </div>
  );
}

export default LogInForm;
