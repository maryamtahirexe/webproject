import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/Button/button";
import logo from "../../assets/images/logo.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Signup = () => {
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

const handleSignUp = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "https://webprojectbackend-production-ef2c.up.railway.app/owner", 
      formData
    );

    if (response.data) {
      setPopupMessage("Sign up successful!");
      setNavigateToDashboard(true);
    } else {
      setPopupMessage("Signup failed. Please try again.");
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
    <div className="bg-login-bg bg-cover bg-center bg-no-repeat min-h-screen w-full flex">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
          {/* <img src={logo} alt="Logo" className="w-1/3 mb-4" /> */}
          {/* <h1 className="text-3xl font-bold text-highlight">KARAYEDAR</h1> */}
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="Logo" className="w-17 h-16" />
            <h2 className="text-4xl text-highlight">Sign Up</h2>
          </div>
          <form className="w-full max-w-sm" onSubmit={handleSignUp}>
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
              <Button text="Sign Up" />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="text-highlight cursor-pointer hover:underline"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </span>
            </p>
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

export default Signup;
