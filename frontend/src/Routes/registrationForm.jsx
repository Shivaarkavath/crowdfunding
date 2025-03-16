import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import NavBar from "../Components/navbar_Landing";
import styles from "./styles/registrationForm.module.css";

const RegistrationForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    campaignTitle: "",
    description: "",
    targetAmount: "",
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
      // Add your API call here to submit the form data
      toast.success("Registration successful!");
      props.history.push("/");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Start a Fundraiser</h2>
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
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter your phone number"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Campaign Title</label>
            <input
              type="text"
              name="campaignTitle"
              value={formData.campaignTitle}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter campaign title"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={styles.textarea}
              placeholder="Describe your campaign"
              rows="4"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Target Amount</label>
            <input
              type="number"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter target amount"
              min="1"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
        <div className={styles.loginLink}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegistrationForm; 