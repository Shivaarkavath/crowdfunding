import React, { useState } from "react";
import config from "../config.js";
import styles from "./styles/donateform.module.css";
import RegistrationForm from "./RegistrationForm"; // Import Registration Form Component

const DonateForm = ({ id, isActivated, amount, onAmountChange }) => {
  const send_to = config.donateTo(id);
  const [showModal, setShowModal] = useState(false);

  // Function to toggle the Registration Form Modal
  const handleDonateClick = (e) => {
    e.preventDefault();
    if (isActivated) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form className={styles.formContainer} method="POST" action={send_to}>
        <div className={styles.inputGroup}>
          <label htmlFor="amount" className={styles.label}>
            <i className="fa fa-inr" aria-hidden="true"></i>
          </label>
          <input
            type="number"
            id="amount"
            className={styles.input}
            name="amount"
            placeholder="Enter Amount"
            min="1"
            disabled={!isActivated}
            required
            value={amount}
            onChange={onAmountChange}
            aria-label="Donation Amount"
          />
        </div>

        <button
          type="button"
          disabled={!isActivated}
          className={`btn ${isActivated ? styles.active : styles.disabled}`}
          onClick={handleDonateClick}
        >
          Donate Now <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </form>

      {/* Registration Form Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <RegistrationForm />
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DonateForm;

