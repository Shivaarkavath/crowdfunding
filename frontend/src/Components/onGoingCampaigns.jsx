import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/onGoingCampaigns.module.css";
import Campaign from "./everyOngoingCampaigns";

const OnGoingCampaigns = ({ loading, data, handleClick }) => {
  const scrollRef = useRef();

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += direction === "left" ? -325 : 325;
    }
  };

  // Sample campaign data (can be replaced with dynamic API data)
  const sampleCampaigns = [
    {
      _id: "1",
      title: "Help Build Clean Water Wells",
      description:
        "Support our mission to provide clean drinking water to underprivileged communities by funding the construction of sustainable water wells.",
      imageUrl: "https://example.com/images/water-well-campaign.jpg",
      required: "₹1,00,000",
      isActivated: true,
    },
    {
      _id: "2",
      title: "Provide Education for All",
      description:
        "Join us in creating opportunities for underprivileged children to access quality education and build a better future.",
      imageUrl: "https://example.com/images/education-campaign.jpg",
      required: "₹2,50,000",
      isActivated: true,
    },
    {
      _id: "3",
      title: "Feed the Hungry",
      description:
        "Help us provide nutritious meals to those in need and fight hunger in underprivileged communities.",
      imageUrl: "https://example.com/images/food-campaign.jpg",
      required: "₹1,75,000",
      isActivated: true,
    },
    {
      _id: "4",
      title: "Support Animal Shelters",
      description:
        "Contribute to the welfare of stray animals by funding shelters, food, and medical care for our furry friends.",
      imageUrl: "https://example.com/images/animal-shelter-campaign.jpg",
      required: "₹80,000",
      isActivated: true,
    },
    {
      _id: "5",
      title: "Disaster Relief Fund",
      description:
        "Provide emergency aid to communities affected by natural disasters. Your support helps rebuild lives.",
      imageUrl: "https://example.com/images/disaster-relief-campaign.jpg",
      required: "₹5,00,000",
      isActivated: true,
    },
  ];

  return (
    <section id="Donate" className={styles.container}>
      <div className="row">
        <h1 className={`col-sm-7 ${styles.title}`}>Ongoing Campaigns</h1>
        <div className={`col-sm-5 ${styles.directions}`}>
          <button
            className={`btn btn-success m-1 ${styles.button}`}
            onClick={() => handleScroll("left")}
          >
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button
            className={`btn btn-success m-1 ${styles.button}`}
            onClick={() => handleScroll("right")}
          >
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className={styles.campaigns} ref={scrollRef}>
        {[...sampleCampaigns, ...data].map((campaign) => (
          <div
            key={campaign._id}
            className={`col-sm-8 col-12 p-0 ${styles.eachCampaign}`}
          >
            <Campaign
              id={campaign._id}
              handleClick={handleClick}
              title={campaign.title}
              description={campaign.description}
              image={campaign.imageUrl}
              requiredAmount={campaign.required}
              isActivated={campaign.isActivated}
            />
            {/* Donate Now Button */}
            <Link to="/Registration-Form">
              <button
                className={`btn btn-primary mt-2 ${styles.donateButton}`}
                disabled={!campaign.isActivated}
              >
                Donate Now <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* View All Campaigns */}
      <div className="col-12 text-center">
        <Link to="/all-campaigns">
          <button className={`btn btn-success ${styles.showAll}`}>
            See More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default OnGoingCampaigns;
