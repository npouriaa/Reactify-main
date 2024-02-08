import React from "react";
import { useInView } from "react-intersection-observer";

const ScrollElement = ({ children , styles}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  return (
    <>
      <div
        ref={ref}
        className={`${
          inView ? "opacity-1" : "opacity-0 translate-y-10"
        } transition-all duration-450 ${styles}`}
      >
        {children}
      </div>
    </>
  );
};

export default ScrollElement;