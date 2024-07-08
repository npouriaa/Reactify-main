import "../assets/styles/loader.css";

const LoaderModal = ({ fullSize, customeStyle, bg }) => {
  return (
    <div
      className={`${
        fullSize ? "h-full w-full absolute" : "h-screen fixed w-screen"
      }  z-[2000]  left-0 top-0 bottom-0`}
    >
      <div className="w-full h-full  flex justify-center items-center absolute">
        <div
          className={`w-full ${
            bg ? bg : "bg-[#00000071]"
          } h-full relative ${customeStyle}`}
        ></div>
        <div className="loader absolute z-10"></div>
      </div>
    </div>
  );
};

export default LoaderModal;
