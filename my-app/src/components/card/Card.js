import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteShop } from "../../redux/slices/shopSlice/shopSlice";
import { deleteApartment } from "../../redux/slices/apartmentSlice/apartmentSlice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Button from "../Button/button";

const Card = ({ type, id, name, location }) => {
  const dispatch = useDispatch();
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleDelete = () => {
    setPopupMessage(
      `Are you sure you want to delete this ${type.toLowerCase()}?`
    );
    setConfirmationPopup(true);
  };

  const confirmDelete = async () => {
    try {
      if (type === "Shop") {
        await dispatch(deleteShop(id.toString())).unwrap();
      } else if (type === "Apartment") {
        await dispatch(deleteApartment(id.toString())).unwrap();
      }
      setPopupMessage(`${type} deleted successfully`);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error(`Failed to delete ${type.toLowerCase()}:`, error);
      setPopupMessage(`Failed to delete ${type}. Please try again.`);
      setShowSuccessPopup(true);
    } finally {
      setConfirmationPopup(false);
    }
  };

  const closePopup = () => {
    setConfirmationPopup(false);
    setShowSuccessPopup(false);
    setPopupMessage("");
  };

  return (
    <div className="bg-transparent shadow-2xl rounded-lg p-6 hover:shadow-primary transition-shadow duration-300 border border-primary">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-1 text-primary">{name}</h2>
        <div className="flex space-x-2">
          <button onClick={handleDelete} aria-label="Delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-primary hover:text-highlight transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-accent text-base mb-4">Location: {location}</p>

      {confirmationPopup && (
        <Popup open={true} onClose={closePopup} closeOnDocumentClick>
          <div className="w-full text-center p-4 rounded-lg shadow-lg">
            <p>{popupMessage}</p>
            <div className="mt-4 gap-x-4 flex justify-around">
              <Button text="Yes" onClick={confirmDelete} />
              <Button text="No" onClick={closePopup} />
            </div>
          </div>
        </Popup>
      )}

      {showSuccessPopup && (
        <Popup open={true} onClose={closePopup} closeOnDocumentClick>
          <div className="w-full text-center p-4 rounded-lg shadow-lg">
            <p>{popupMessage}</p>
            <div className="mt-4 gap-x-4 flex justify-around">
              <Button text="OK" onClick={closePopup} />
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Card;
