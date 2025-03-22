import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createRequest, updateRequest } from "../../redux/slices/requestSlice";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/Button/button";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AddRequest = ({ label }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const editRequest = location.state?.request;

  const [formData, setFormData] = useState({
    message: "",
    status: "Pending",
    type: "",
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);

  useEffect(() => {
    if (editRequest) setFormData(editRequest);
  }, [editRequest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRequest) {
        await dispatch(
          updateRequest({ id: editRequest._id, ...formData })
        ).unwrap();
        setPopupMessage("Request updated successfully");
        setPopupType("success");
      } else {
        await dispatch(createRequest(formData)).unwrap();
        setPopupMessage("Request created successfully");
        setPopupType("success");
      }
      setFormData({ message: "", status: "Pending", type: "" });
    } catch (error) {
      setPopupMessage("Failed to save request");
      setPopupType("error");
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
    if (popupType === "success") {
      navigate("/dashboard/requests");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl text-highlight mb-6 text-center">
          {editRequest ? "Edit Request" : "Add Request"}
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Message"
            name="message"
            id="message"
            placeholder="Enter request message"
            value={formData.message}
            onChange={handleChange}
          />
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-highlight text-base mb-2"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              className="shadow bg-primary appearance-none border border-accent rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-highlight hover:bg-primary hover:text-white hover:border-highlight"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <InputField
            label="Type"
            name="type"
            id="type"
            placeholder="Enter request type"
            value={formData.type}
            onChange={handleChange}
          />
          <div className="flex my-4 gap-x-4">
            <Button text={editRequest ? "Update Request" : "Create Request"} />
            <Button
              text="Close"
              onClick={() => navigate("/dashboard/requests")}
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

export default AddRequest;
