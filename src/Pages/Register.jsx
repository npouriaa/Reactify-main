import { Link } from "react-router-dom";
import logo from "../assets/images/logo/Reactify-black.png";
import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Register = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-[#7932F5] via-[#F5658C] to-[#F5658C]">
      <div className="flex gap-4 items-center flex-col rounded-2xl max-sm:w-[350px] sm:w-[440px] sm2:w-[380px] md:w-[500px] shadow-xl bg-white py-6 px-8">
        <div className="w-full flex items-center justify-center relative">
          <Link to="/">
            <img className="max-sm:h-10 sm:h-12" src={logo} alt="logo" />
          </Link>
          <Link
            to="/"
            className="absolute left-0 w-9 h-9 bg-[#7932F5] hover:bg-[#FB3C7F] transition-all flex justify-center items-center rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="#fff"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </Link>
        </div>
        <div className="w-full text-center flex flex-col justify-center items-center">
          <h1 className="text-xl">Welcome!</h1>
          <p className="text-gray-700">
            Join us to connect, share, and discover.
          </p>
        </div>
        <Form className="max-sm:w-full md:w-5/6 flex flex-col gap-2" layout="vertical" name="register_form">
          <Form.Item
            hasFeedback
            label="username :"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="email :"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password should be more than 6 chars!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="upload"
            label="Profile Photo"
            rules={[
              {
                required: true,
                message: "Please select a profile photo!",
              },
            ]}
          >
            <Upload maxCount={1} name="profile" beforeUpload={() => false}>
              <Button className="antd-btn border-none bg-[#7932F5] text-white hover:bg-[#FB3C7F] transition-all duration-500" icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <div className="w-full flex items-center justify-center">
            <button className="w-full bg-[#7932F5] text-white hover:bg-[#FB3C7F] transition-all duration-500 py-2 rounded-lg">Register</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
