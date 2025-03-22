import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPayment, updatePayment } from "../../redux/slices/paymentSlice";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/Button/button";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const AddPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const editPayment = location.state?.payment;

  const [formData, setFormData] = useState({
    amount: "",
    bankAccountNumber: "",
    message: "",
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);

  useEffect(() => {
    if (editPayment) setFormData(editPayment);
  }, [editPayment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPayment) {
        await dispatch(updatePayment({ id: editPayment._id, ...formData })).unwrap();
        setPopupMessage("Payment updated successfully");
        setPopupType("success");
      } else {
        await dispatch(createPayment(formData)).unwrap();
        setPopupMessage("Payment created successfully");
        setPopupType("success");
      }
      setFormData({ amount: "", bankAccountNumber: "", message: "" });
    } catch (error) {
      setPopupMessage("Failed to save payment");
      setPopupType("error");
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
    if (popupType === "success") {
      navigate("/dashboard/payments");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl text-highlight mb-6 text-center">
          {editPayment ? "Edit Payment" : "Add Payment"}
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Amount"
            name="amount"
            id="amount"
            placeholder="Enter payment amount"
            value={formData.amount}
            onChange={handleChange}
          />
          <InputField
            label="Bank Account Number"
            name="bankAccountNumber"
            id="bankAccountNumber"
            placeholder="Enter bank account number"
            value={formData.bankAccountNumber}
            onChange={handleChange}
          />
          <InputField
            label="Message"
            name="message"
            id="message"
            placeholder="Enter a message"
            value={formData.message}
            onChange={handleChange}
          />
          <div className="flex my-4 gap-x-4">
            <Button text={editPayment ? "Update Payment" : "Create Payment"} />
            <Button text="Close" onClick={() => navigate("/dashboard/payments")} />
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

export default AddPayment;

