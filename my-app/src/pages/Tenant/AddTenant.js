import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTenant, updateTenant } from "../../redux/slices/tenantSlice";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "../../components/inputField/inputField"; 
import Button from "../../components/Button/button"; 
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AddTenant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const editTenant = location.state?.tenant;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);

  useEffect(() => {
    if (editTenant) setFormData(editTenant);
  }, [editTenant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTenant) {
        await dispatch(
          updateTenant({ id: editTenant._id, ...formData })
        ).unwrap();
        setPopupMessage("Tenant updated successfully");
        setPopupType("success");
      } else {
        await dispatch(createTenant(formData)).unwrap();
        setPopupMessage("Tenant created successfully");
        setPopupType("success");
      }
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setPopupMessage("Failed to save tenant");
      setPopupType("error");
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
    if (popupType === "success") {
      navigate("/dashboard/tenants");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl text-highlight mb-6 text-center">
          {editTenant ? "Edit Tenant" : "Add Tenant"}
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            id="name"
            placeholder="Enter tenant name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            id="email"
            placeholder="Enter tenant email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="password"
            id="password"
            placeholder="Enter tenant password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex my-4 gap-x-4">
            <Button text={editTenant ? "Update Tenant" : "Create Tenant"} />
            <Button
              text="Close"
              onClick={() => navigate("/dashboard/tenants")}
            />
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

export default AddTenant;
