import React from "react";
import ChildImage from "./assets/whyUsSection-happyKids.jpg";
import styles from "./styles/whyUsSection.module.css";

const WhyUs = () => {
  return (
    <React.Fragment>
      <div className="row col-12">
        <div className={`col-md-8 ${styles.whyUs}`}>
          <h1 className={styles.header}>Why us ?</h1>
          <p className={styles.para}>
          At Rotaract IIITM, we’re more than just a crowdfunding platform—we’re your dedicated partner in turning ideas into reality. Our user-friendly interface, secure payment system, and transparent funding process make it easy for creators to launch campaigns and for backers to contribute with confidence. We offer personalized support, marketing tools, and a thriving community to help you reach your goals faster. Whether you’re an innovator, entrepreneur, or supporter, we’re here to ensure your journey is successful every step of the way.
          </p>
        </div>
        <div className="col-md-4">
          <img className={styles.image} src={ChildImage} alt="HappyKids" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyUs;
