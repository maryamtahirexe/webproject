import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOwner,
  clearMessage,
  clearError,
  fetchOwner,
} from "../../redux/slices/updateSlice/updateSlice";
import Button from "../../components/Button/button";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message, error, owner } = useSelector(
    (state) => state.update
  );

  useEffect(() => {
    dispatch(fetchOwner());
  }, [dispatch]);

  useEffect(() => {
    if (owner) {
      setEmail(owner.email);
      setOldPassword(owner.password);
    }
  }, [owner]);

  useEffect(() => {
    if (message) {
      setPopupMessage(message);
      dispatch(clearMessage());
    }
    if (error) {
      setPopupMessage(error);
      dispatch(clearError());
    }
  }, [message, error, dispatch]);

  const handleUpdate = () => {
    setShowConfirmation(true);
  };

  const confirmUpdate = async () => {
    try {
      const passwordToUpdate = newPassword || oldPassword;

      const response = await dispatch(
        updateOwner({ email, newPassword: passwordToUpdate })
      ).unwrap();

      if (response.status === "success") {
        setPopupMessage("Profile updated successfully");
        setTimeout(() => setPopupMessage(null), 3000);
      } else {
        setPopupMessage(response.message || "Failed to update profile");
      }

      setShowConfirmation(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      setPopupMessage(error.message || "Failed to update profile");
    }
  };

  return (
    <div className="p-6 m-2">
      <h1 className="text-3xl mb-4 font-bold text-primary text-center">
        Profile
      </h1>
      <div className="mb-4">
        <label className="block text-primary mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-4">
        <label className="block text-primary mb-2" htmlFor="oldPassword">
          Old Password
        </label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          disabled
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label className="block text-primary mb-2" htmlFor="newPassword">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex justify-center space-x-7 mt-3">
        <Button
          text={loading ? "Updating..." : "Update"}
          onClick={handleUpdate}
          disabled={loading}
          className="px-6 py-3"
        />
        <Button
          text="Cancel"
          onClick={() => navigate(-1)}
          variant="secondary"
          className="px-6 py-2"
        />
      </div>

      {popupMessage && (
        <Popup
          open={true}
          onClose={() => setPopupMessage(null)}
          closeOnDocumentClick
        >
          <div className="w-full text-center p-4 rounded-lg shadow-lg">
            {popupMessage}
            <Button text="OK" onClick={() => setPopupMessage(null)} />
          </div>
        </Popup>
      )}

      {showConfirmation && (
        <Popup
          open={true}
          onClose={() => setShowConfirmation(false)}
          closeOnDocumentClick
        >
          <div className="w-full text-center p-4 rounded-lg shadow-lg">
            <p>Are you sure you want to change your password?</p>
            <div className="mt-4 gap-x-4 flex justify-around">
              <Button text="Confirm" onClick={confirmUpdate} />
              <Button
                text="Cancel"
                onClick={() => setShowConfirmation(false)}
              />
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ProfilePage;
