import { CiCamera } from "react-icons/ci";

const NoPosts = ({text}) => {
  return (
    <div className="h-80 w-full text-white rounded-md border-white border-1 border flex justify-center items-center gap-4 flex-col">
      <div className="w-24 h-24 border-white border-1 border rounded-full flex justify-center items-center">
        <CiCamera size={60}/>
      </div>
      <h3 className="text-xl font-bold">No Posts {text}</h3>
    </div>
  );
};

export default NoPosts;
