import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/Button/button";
import logo from "../../assets/images/logo.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [navigateToDashboard, setNavigateToDashboard] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/owner/signin",
        formData
      );

      if (response.data.owner) {
        setPopupMessage("Sign in successful!");
        setNavigateToDashboard(true);
      } else {
        setPopupMessage("Authentication failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";
      setPopupMessage(errorMessage);
    }
  };

  const handlePopupClose = () => {
    setPopupMessage(null);
    if (navigateToDashboard) {
      navigate("/dashboard", { state: { owner: formData } });
    }
  };

  return (
    <div className="bg-login-bg min-h-screen flex">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
          <img src={logo} alt="Logo" className="w-1/3 mb-4" />
          <h1 className="text-3xl font-bold text-highlight">KARAYEDAR</h1>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
          <h2 className="text-2xl text-highlight mb-6">Welcome Back!</h2>
          <form className="w-full max-w-sm" onSubmit={handleSignIn}>
            <InputField
              label="Email"
              type="email"
              id="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              type="password"
              id="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="mt-6">
              <Button text="Login" />
            </div>
          </form>
        </div>
      </div>

      {popupMessage && (
        <Popup open={true} onClose={handlePopupClose} closeOnDocumentClick>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-primary mb-4">{popupMessage}</p>
            <Button text="OK" onClick={handlePopupClose} />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default SignIn;
