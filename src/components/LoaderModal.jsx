import "../assets/styles/loader.css";

const LoaderModal = () => {
  return (
    <div className="left-0 w-screen absolute h-screen z-10">
      <div className="w-full h-full flex justify-center items-center absolute">
        <div className="w-full bg-black opacity-40 h-full relative"></div>
        <div className="loader absolute z-10"></div>
      </div>
    </div>
  );
};

export default LoaderModal;
