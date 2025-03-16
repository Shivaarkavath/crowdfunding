import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Page Components
import LandingPage from "./Routes/landingPage";
import AboutUs from "./Routes/aboutUs";
import ContactUs from "./Routes/contactUs";
import PageNotFound from "./Routes/PageNotFound";

// Campaign Components
import Campaign from "./Routes/campaign";
import AllCampaigns from "./Routes/allCampaigns";
import NewCampaign from "./Routes/newCampaign";
import EditCampaign from "./Routes/editCampaign";

// Auth Components
import Login from "./Routes/login";
import UserRegistration from "./Routes/userRegistration";
import LoginAdmin from "./Routes/loginAdmin";
import RegisterAdmin from "./Routes/registerAdmin";
import AdminDashboard from "./Routes/adminDashboard";

// Donation Components
import DonationForm from "./Routes/donationForm";
import DonationSuccess from "./Routes/donationSuccess";
import DonationFailure from "./Routes/donationFailure";
import RegistrationForm from "./Routes/registrationForm";

// Other Components
import Footer from "./Components/footer";
import ProtectedRoute from "./Components/ProtectedRoute";

// Styles
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <React.Fragment>
      <div id="page-container">
        <div id="content-wrap">
          <ToastContainer />
          <Switch>
            {/* Public Routes */}
            <Route path="/" exact component={LandingPage} />
            <Route path="/about-us" exact component={AboutUs} />
            <Route path="/contact-us" exact component={ContactUs} />
            <Route path="/all-campaigns" exact component={AllCampaigns} />
            <Route path="/campaign/:id" exact component={Campaign} />
            
            {/* Auth Routes */}
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={UserRegistration} />
            <Route path="/admin/login" exact component={LoginAdmin} />
            
            {/* Protected Admin Routes */}
            <ProtectedRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <ProtectedRoute path="/admin/new" exact component={RegisterAdmin} />
            <ProtectedRoute path="/admin/campaign/new" exact component={NewCampaign} />
            <ProtectedRoute path="/admin/campaign/:id/edit" exact component={EditCampaign} />
            
            {/* Donation Routes */}
            <Route path="/Registration-Form" exact component={RegistrationForm} />
            <Route path="/donate/:id" exact component={DonationForm} />
            <Route path="/donation/success/:id" exact component={DonationSuccess} />
            <Route path="/donation/failure" exact component={DonationFailure} />
            
            {/* 404 Route */}
            <Route path="/page-not-found" exact component={PageNotFound} />
            <Redirect to="/page-not-found" />
          </Switch>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default App;
