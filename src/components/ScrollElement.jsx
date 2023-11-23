import React from "react";
import { useInView } from "react-intersection-observer";

const ScrollElement = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className={`${inView ? 'opacity-1' : 'opacity-0'} transition-all duration-500`}
    >
      {children}
    </div>
  );
};

export default ScrollElement;
