import React from "react";

const ReusableButton = ({ text }) => {
  return (
    <button className='bg-black text-white py-3 px-10 rounded-full hover:bg-gray-800 transition font-roboto font-normal text-base'>
      {text}
    </button>
  );
};

export default ReusableButton;
