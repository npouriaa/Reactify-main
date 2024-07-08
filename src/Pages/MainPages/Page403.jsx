import { Result } from "antd";
import { Link } from "react-router-dom";

const Page403 = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
      />
      <Link
        className="max-sm:w-20 max-sm:text-xs max-sm:h-10 sm:text-sm sm:w-24 lg:w-28 lg:h-12 rounded-lg bg-[#615DFA] text-white hover:bg-[#F5658C] transition-all duration-500 flex justify-center items-center"
        to="/Login"
      >
        Login
      </Link>
    </div>
  );
};

export default Page403;
