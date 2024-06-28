import { CiCamera } from "react-icons/ci";

const NoPosts = ({text}) => {
  return (
    <div className="h-80 w-full dark:text-white rounded-md dark:border-white border-black border-1 border flex justify-center items-center gap-4 flex-col">
      <div className="w-24 h-24 dark:border-white border-black border-1 border rounded-full flex justify-center items-center">
        <CiCamera size={60}/>
      </div>
      <h3 className="text-xl font-bold">{text}</h3>
    </div>
  );
};

export default NoPosts;
