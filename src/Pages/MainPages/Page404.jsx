import { Result } from "antd";

const Page404 = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
};

export default Page404;
