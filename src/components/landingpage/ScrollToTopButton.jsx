import{ useEffect, useState } from "react";

const GoToTopButton = () => {
  const [isFixed, setFixed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 600) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`go-to-top-btn duration-700 w-12 h-12 flex transition-all rounded-full fixed bottom-6 text-center right-6 justify-center items-center ${
        isFixed ? "opacity-1 visible" : "opacity-0 invisible"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#fff"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 15.75 7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
};

export default GoToTopButton;
