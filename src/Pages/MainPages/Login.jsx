import { Form, Input, Tooltip } from "antd";
import logo from "../../assets/images/logo/Reactify-black.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import useNotification from "../../Hooks/useNotification";
import { RequestsContext } from "../../context/RequestsContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import LoaderModal from "../../components/LoaderModal";

const Login = () => {
  const { openNotificationError, contextHolder } = useNotification();
  const navigate = useNavigate();
  const { setCurrentUser, loading, setLoading, setSendVerificationLink } =
    useContext(RequestsContext);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      if (response.user.emailVerified) {
        setCurrentUser(response.user);
        navigate(`/${response.user.displayName}-${response.user.uid}`);
      } else {
        setSendVerificationLink(true);
        navigate("/verify-email");
      }
    } catch (err) {
      openNotificationError("Error", err.message, "top");
      console.log(err);
    }
    setLoading(false);
  };

  const onFinish = (values) => {
    const { email, password } = values;
    loginUser(email, password);
  };

  return (
    <>
      {contextHolder}
      {loading && <LoaderModal />}
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-[#7932F5] via-[#F5658C] to-[#F5658C]">
        <div className="flex gap-2 items-center flex-col rounded-2xl max-sm:w-[350px] sm:w-[440px] max-sm2:w-[380px] md:w-[500px] shadow-xl bg-white py-10 px-8">
          <div className="w-full flex items-center justify-center relative">
            <Link to="/">
              <img className="max-sm:h-10 sm:h-12" src={logo} alt="logo" />
            </Link>
            <Tooltip title="home page">
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
            </Tooltip>
          </div>
          <div className="w-full text-center flex flex-col justify-center items-center">
            <h1 className="max-sm:text-lg md:text-xl">Welcome back!</h1>
            <p className="text-gray-700 max-sm:text-sm md:text-base">
              Log in and reconnect with friends
            </p>
          </div>
          <Form
            onFinish={onFinish}
            className="max-sm:w-full md:w-5/6 flex flex-col"
            layout="vertical"
            name="login_form"
          >
            <Form.Item
              hasFeedback
              label="Email :"
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
            <div className="w-full flex items-center justify-center">
              <button className="w-full bg-[#7932F5] text-white hover:bg-[#FB3C7F] transition-all duration-500 py-2 rounded-lg">
                Login
              </button>
            </div>
          </Form>
          <p className="text-sm">
            Not a member yet ?{" "}
            <Link
              className="text-[#7932F5] hover:text-[#FB3C7F] transition-all duration-500"
              to="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
  z;
};

export default Login;
