"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200); // Show when scrolled down 200px
    };

    // Listen for scroll events
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll animation when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  };

  return (
    <button
      className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full bg-pink-500 text-white p-2.5 sm:p-3 shadow-xl transition-opacity duration-300 touch-manipulation ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
};

export default ScrollToTopButton;
