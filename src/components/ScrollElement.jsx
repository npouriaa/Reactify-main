import React from "react";
import { useInView } from "react-intersection-observer";

const ScrollElement = ({ children, styles,  transition}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const transitions = `opacity-0 ${transition ? transition : 'translate-y-10'}`

  return (
    <>
      <div
        ref={ref}
        className={`${
          inView ? "opacity-1 tra" : transitions 
        } transition-all duration-500 ${styles}`}
      >
        {children}
      </div>
    </>
  );
};

export default ScrollElement;
