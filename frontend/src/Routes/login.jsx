import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import NavBar from "../Components/navbar_Landing";
import styles from "./styles/login.module.css";
import { login } from "../services/auth";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const error = await login(formData.email, formData.password);
      if (!error) {
        toast.success("Login successful!");
        // Check if there's a redirect path in location state
        const { from } = props.location.state || { from: { pathname: "/" } };
        props.history.push(from.pathname);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Login to Your Account</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter your email"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
        <div className={styles.registerLink}>
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login; 