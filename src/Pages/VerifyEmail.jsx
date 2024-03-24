import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import useNotification from "../Hooks/useNotification";
import LoaderModal from "../components/LoaderModal";
import { Navigate } from "react-router-dom";
import { Modal } from "antd";
import { auth } from "../firebase";

const modalConfig = {
  title: "Warning",
  content: <p>Please don't refresh the page while this proccess.</p>,
};

const VerifyEmail = () => {
  const { currentUser, setCurrentUser, sendVerificationLink } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { openNotificationError, contextHolder } = useNotification();
  const [modal, modalContextHolder] = Modal.useModal();

  const sendEmailVerificationLink = async () => {
    setLoading(true);
    try {
      await sendEmailVerification(auth.currentUser);
    } catch (err) {
      openNotificationError("Error", err.message, "top");
    }
    setLoading(false);
    modal.warning(modalConfig);
  };

  useEffect(() => {
    sendEmailVerificationLink();

    const interval = setInterval(() => {
      auth.currentUser.reload().then(() => {
        if (auth.currentUser.emailVerified) {
          setCurrentUser(auth.currentUser);
        }
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [setCurrentUser]);

  if (!sendVerificationLink) {
    return <Navigate to="/register" />;
  }

  return (
    <>
      {contextHolder}
      {modalContextHolder}
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-[#7932F5] via-[#F5658C] to-[#F5658C]">
        {loading ? (
          <LoaderModal />
        ) : (
          <div className="w-[600px] h-[300px] bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center p-3 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-16 h-16 stroke-[#F5658C]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <h1 className="text-2xl font-bold">Check your email</h1>
            <div className="text-center">
              <p>
                We've sent an email with a verification link to{" "}
                {auth.currentUser.email}
              </p>
              <p>
                {" "}
                please confirm it to complete your register.
              </p>
            </div>
            <p>{currentUser.emailVerified ? "verified" : "not verified"}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
