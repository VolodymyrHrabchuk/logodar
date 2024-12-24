// components/HeroPopup.jsx
"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const HeroPopup = ({ isOpen, onClose, children }) => {
  const modalRoot =
    typeof window !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'
      onClick={onClose}
      aria-modal='true'
      role='dialog'
      aria-labelledby='modal-title'
    >
      <div
        className='bg-orange rounded-lg p-14 max-w-5xl w-full relative z-50 6 py-16 overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative SVGs - Hide on small screens */}
        <svg
          width='933'
          height='530'
          viewBox='0 0 933 530'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute top-20 left-20 scale-110 -z-10 hidden md:block'
        >
          {/* SVG Paths */}
          <path
            d='M805.518 430.009C755.827 499.942 663.503 476.688 623.553 456.32C199.553 308.911 230.405 238.597 87.811 149.357C-90.4309 37.8063 186.342 -2.08935 351.425 48.5403C516.508 99.17 587.574 -70.6218 647.838 128.926C708.101 328.473 867.632 342.593 805.518 430.009Z'
            stroke='white'
            strokeOpacity='0.3'
          />
          <path
            d='M838.369 449.474C784.71 525.016 685.051 499.924 641.929 477.936C184.253 318.835 217.575 242.886 63.6653 146.54C-128.722 26.1062 170.068 -17.0503 348.264 37.5903C526.461 92.2309 603.219 -91.166 668.225 124.336C733.231 339.837 905.443 355.048 838.369 449.474Z'
            stroke='white'
            strokeOpacity='0.3'
          />
          <path
            d='M914.978 473.368C856.714 555.375 748.48 528.118 701.646 504.239C204.582 331.435 240.758 248.983 73.5963 144.356C-135.356 13.5729 189.126 -33.2379 382.658 26.1119C576.189 85.4618 659.523 -113.641 730.152 120.339C800.781 354.319 987.807 370.859 914.978 473.368Z'
            stroke='white'
            strokeOpacity='0.3'
          />
        </svg>

        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-white'
          aria-label='Close modal'
        >
          <svg
            width='22'
            height='22'
            viewBox='0 0 22 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.38965 20.612L11.0018 10.9999L20.614 20.612M20.614 1.3877L11 10.9999L1.38965 1.3877'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className='mt-4 overflow-y-auto max-h-[80vh] text-center'>
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default HeroPopup;
