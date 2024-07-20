import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-5 lg:bottom-10 lg:right-10">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-black text-white text-3xl font-semibold p-3 rounded-full shadow-md hover:bg-gray-800 focus:outline-none"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default BackToTop;
