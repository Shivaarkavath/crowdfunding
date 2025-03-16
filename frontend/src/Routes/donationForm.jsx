import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/navbar_Landing";
import config from "../config";
import styles from "./styles/donationForm.module.css";

const DonationForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    phone: "",
    message: "",
    paymentMethod: "card", // card, upi, netbanking
  });

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axios.get(config.getCampaignDataByIdUrl(id));
        setCampaignDetails(response.data);
      } catch (error) {
        toast.error("Failed to fetch campaign details");
        history.push("/page-not-found");
      }
    };

    fetchCampaignDetails();
  }, [id, history]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First store the donation details
      const donationResponse = await axios.post(config.storeDonationUrl(), {
        campaignId: id,
        ...formData
      });

      if (donationResponse.data) {
        // Then process the payment
        const paymentResponse = await axios.post(config.donateTo(id), {
          amount: formData.amount,
          paymentMethod: formData.paymentMethod
        });

        if (paymentResponse.data) {
          toast.success("Thank you for your donation!");
          history.push(`/donation/success/${id}`);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Payment failed. Please try again.";
      toast.error(errorMessage);
      history.push("/donation/failure");
    }
  };

  if (!campaignDetails) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <NavBar />
      <div className={styles.formContainer}>
        <div className={styles.campaignInfo}>
          <h2>{campaignDetails.title}</h2>
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${(campaignDetails.raisedAmount / campaignDetails.requiredAmount) * 100}%` }}
              ></div>
            </div>
            <div className={styles.progressStats}>
              <span>Raised: ₹{campaignDetails.raisedAmount}</span>
              <span>Goal: ₹{campaignDetails.requiredAmount}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter your name"
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
            <label>Donation Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
              className={styles.input}
              placeholder="Enter amount"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Leave a message of support"
              rows="3"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Payment Method</label>
            <div className={styles.paymentOptions}>
              <label className={styles.paymentOption}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                />
                <span>Card</span>
              </label>
              <label className={styles.paymentOption}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={handleChange}
                />
                <span>UPI</span>
              </label>
              <label className={styles.paymentOption}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={formData.paymentMethod === "netbanking"}
                  onChange={handleChange}
                />
                <span>Net Banking</span>
              </label>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Proceed to Pay
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default DonationForm; 