import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createShop } from "../../redux/slices/shopSlice/shopSlice.js";
import { createApartment } from "../../redux/slices/apartmentSlice/apartmentSlice.js";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/Button/button";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AddProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState("apartment");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [tenant, setTenant] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProperty = {
      name,
      location,
      tenant,
    };

    if (propertyType === "shop") {
      dispatch(createShop(newProperty));
    } else {
      dispatch(createApartment(newProperty));
    }

    setName("");
    setLocation("");
    setTenant("");

    setPopupMessage("Property added successfully!");
    setPopupType("success");
  };

  const closePopup = () => {
    setPopupMessage(null);
    if (popupType === "success") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl text-highlight mb-6 text-center">
          Add New {propertyType === "shop" ? "Shop" : "Apartment"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="propertyType" className="block text-highlight text-base mb-2">
              Property Type:
            </label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="shadow bg-primary appearance-none border border-accent rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-highlight hover:bg-primary hover:text-white hover:border-highlight"
            >
              <option value="apartment">Apartment</option>
              <option value="shop">Shop</option>
            </select>
          </div>

          <InputField
            label="Property Name"
            name="name"
            id="name"
            placeholder="Enter property name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <InputField
            label="Location"
            name="location"
            id="location"
            placeholder="Enter property location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <InputField
            label="Tenant (Optional)"
            name="tenant"
            id="tenant"
            placeholder="Enter tenant name"
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
          />

            {/* Button section with Close button */}
            <div className="flex my-4 gap-x-4">
        <button
            type="submit"
            className="bg-highlight w-full hover:bg-highlightHover text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add {propertyType === "shop" ? "Shop" : "Apartment"}
          </button>
          <Button text="Close" onClick={() => navigate("/dashboard")} />
        </div>
        </form>



        {popupMessage && (
          <Popup open={true} onClose={closePopup} closeOnDocumentClick>
            <div className="w-full p-6 text-center">
              <p className="text-primary mb-4">{popupMessage}</p>
              <Button text="OK" onClick={closePopup} />
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default AddProperty;

