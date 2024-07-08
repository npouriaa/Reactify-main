import "../../assets/styles/loader.css";

const RequestsLoader = ({ size }) => {
  return (
    <div className="flex justify-center items-center">
      <span
        className={`requests-loader ${
          size ? size : "w-5 h-5"
        } inline-block border-b-transparent border-[2px] rounded-full border-[#615DFA]`}
      ></span>
    </div>
  );
};

export default RequestsLoader;
