// components/RandomPhrasePopup.jsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";

const PHRASES = [
  "Сьогодні твої слова знайдуть ідеальний відгук у серці співрозмовника!",
  "Кожне твоє слово має силу змінити світ - використовуй його мудро!",
  "Твій голос - це унікальний інструмент, який відкриває нові горизонти!",
  "Впевненість у мовленні - твій ключ до успіху. Користуйся цим!",
  "Коли ти говориш із душею, твої слова здатні надихати інших!",
  "Сьогодні ти знайдеш ідеальний спосіб висловити свої думки!",
  "Те, як і що ти говориш, має силу перетворити складнощі на можливості!",
  "Гармонія голосу і змісту - це твоя суперсила!",
  "Кожне твоє слово - це крок до кращого розуміння себе і світу!",
  "Слова, сказані з любов'ю, повертаються із вдячністю!",
  "Сьогодні ти почуєш слово, яке стане твоїм натхненням!",
  "Чіткість і емоційність твоєї мови здивують навіть тебе!",
  "Твій голос сьогодні стане потужною підтримкою для когось!",
  "Слова мають магію. Твої сьогодні особливо чарівні!",
  "Твоя історія варта того, щоб її почули. Розкажи її світові!",
  "Кожне слово, сказане тобою сьогодні, приносить світло і тепло!",
  "Ритм і мелодія твого голосу творять гармонію у спілкуванні!",
  "Сьогодні ти відчуєш, як твої слова змінюють атмосферу навколо!",
  "Слова - це міст між душами. Ти майстер його будови!",
  "Сьогодні ти знайдеш правильні слова, навіть для найважчої розмови!",
  "Твоя промова сьогодні залишить приємний слід у серці кожного слухача!",
  "Навіть мовчання може бути красномовним. Ти знайдеш баланс!",
  "Сьогодні ти відчуєш легкість і радість у спілкуванні!",
  "Твій голос - твоя унікальність. Сміливо показуй його світу!",
  "Сьогодні ти дізнаєшся чогось нового, що допоможе стати кращим оратором!",
  "Слова, сказані щиро, завжди звучать найкраще!",
  "Довірся своєму голосу. Він знає, як донести твої думки!",
  "Сьогодні ти навчишся чути не тільки слова, а й те, що за ними стоїть!",
  "Твій дар комунікації допоможе створити щось прекрасне!",
  "Вдалий день починається зі слів: «Я можу!». Ти можеш все!",
];

const RandomPhrasePopup = ({ isOpen, onClose }) => {
  const [phrase, setPhrase] = useState("");
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
      const randomIndex = Math.floor(Math.random() * PHRASES.length);
      setPhrase(PHRASES[randomIndex]);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  // useEffect(() => {
  //   if (isOpen) {
  //     const randomIndex = Math.floor(Math.random() * PHRASES.length);
  //     setPhrase(PHRASES[randomIndex]);
  //   }
  // }, [isOpen]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role='dialog'
          aria-modal='true'
          aria-labelledby='random-phrase-title'
          aria-describedby='random-phrase-description'
        >
          <motion.div
            className='bg-orange rounded-lg p-6 sm:p-10 max-w-[90vw]  md:max-w-lg w-full h-[60vh] sm:h-112 relative z-50 overflow-hidden flex flex-col items-center justify-center'
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* User Provided SVG */}
            <svg
              width='933'
              height='530'
              viewBox='0 0 933 530'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute top-0 left-0 scale-110 z-10  md:block'
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
              className='absolute top-3 right-3 p-2 bg-transparent rounded-full focus:outline-none cursor-pointer z-10'
              aria-label='Close modal'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 19L19 1M19 19L1 1'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>

            {/* Phrase Content */}
            <div className='mt-6 sm:mt-8 text-center flex flex-col items-center'>
              <motion.div
                id='random-phrase-description'
                className='text-white text-lg sm:text-xl font-lora leading-relaxed'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h3 className='text-white text-3xl font-medium sm:text-4xl font-lora leading-relaxed mb-4 md:mb-10 mt-0'>
                  Передбачення каже:
                </h3>
                &ldquo;{phrase}&rdquo;
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

export default RandomPhrasePopup;
