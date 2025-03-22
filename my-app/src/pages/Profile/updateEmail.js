import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOwner,
  clearMessage,
  clearError,
} from "../../redux/slices/updateSlice/updateSlice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const UpdateEmailPage = () => {
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.update);

  useEffect(() => {
    setPopupMessage(message || error);
  }, [message, error]);

  const handleUpdate = async () => {
    if (!newEmail || !confirmNewEmail) {
      setPopupMessage("Both fields are required");
      setTimeout(() => setPopupMessage(null), 3000);
      return;
    }
    if (newEmail !== confirmNewEmail) {
      setPopupMessage("Emails do not match");
      setTimeout(() => setPopupMessage(null), 3000);
      return;
    }

    const form = document.getElementById("updateEmailForm");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const response = await dispatch(
        updateOwner({ id: 1, email: newEmail })
      ).unwrap();
      setPopupMessage(response.message || "Email updated successfully");
      setTimeout(() => {
        setPopupMessage(null);
      }, 3000);
      dispatch(clearMessage());
      dispatch(clearError());

      setNewEmail("");
      setConfirmNewEmail("");
    } catch (error) {
      console.error("Error updating email:", error);
      setPopupMessage("Failed to update email");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md bg-primary p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-highlight">
          Update Email
        </h2>
        <form
          id="updateEmailForm"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <div className="mb-4">
            <label className="block text-highlight mb-2" htmlFor="newEmail">
              New Email
            </label>
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-highlight mb-2"
              htmlFor="confirmNewEmail"
            >
              Confirm New Email
            </label>
            <input
              type="email"
              id="confirmNewEmail"
              value={confirmNewEmail}
              onChange={(e) => setConfirmNewEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-highlight text-white px-4 py-2 rounded-md hover:bg-highlight"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Email"}
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </form>
        {popupMessage && (
          <Popup
            open={true}
            onClose={() => setPopupMessage(null)}
            closeOnDocumentClick
          >
            <div className="w-full text-center p-4 rounded-lg shadow-lg">
              {popupMessage}
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default UpdateEmailPage;
