import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-highlight w-full hover:bg-highlightHover text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
