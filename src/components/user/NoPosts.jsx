import { CiCamera } from "react-icons/ci";

const NoPosts = ({text}) => {
  return (
    <div className="h-80 w-full dark:text-white rounded-md dark:border-white border-[#898989] border-1 border flex justify-center items-center gap-4 flex-col">
      <div className="w-24 h-24 dark:border-white border-[#898989] border-1 border rounded-full flex justify-center items-center text-[#898989] dark:text-white">
        <CiCamera size={60}/>
      </div>
      <h3 className="text-xl font-bold text-[#898989] dark:text-white">{text}</h3>
    </div>
  );
};

export default NoPosts;
