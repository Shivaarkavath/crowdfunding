import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/navbar_Landing";
import config from "../config";
import styles from "./styles/login.module.css"; // Reusing login styles since they're similar

const UserRegistration = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(config.registerUserUrl(), {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data) {
        toast.success("Registration successful! Please login.");
        history.push("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Create an Account</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter your full name"
            />
          </div>
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
              placeholder="Create a password"
              minLength="6"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Confirm your password"
              minLength="6"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
        <div className={styles.registerLink}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserRegistration; 