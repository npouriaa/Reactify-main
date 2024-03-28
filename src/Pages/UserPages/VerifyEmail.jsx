import { useContext, useEffect, useRef, useState } from "react";
import { RequestsContext } from "../../context/RequestsContext";
import { sendEmailVerification } from "firebase/auth";
import useNotification from "../../Hooks/useNotification";
import LoaderModal from "../../components/LoaderModal";
import { Navigate, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { auth } from "../../firebase";

const modalConfig = {
  title: "Warning",
  content: <p>Please don't refresh the page while this proccess.</p>,
};

const VerifyEmail = () => {
  const { setCurrentUser, sendVerificationLink, loading, setLoading } =
    useContext(RequestsContext);
  const { openNotificationError, contextHolder } = useNotification();
  const [modal, modalContextHolder] = Modal.useModal();
  const timerRef = useRef(null);
  const [timer, setTimer] = useState("00:00");
  const navigate = useNavigate();

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      setTimer(null);
    }
  };

  const clearTimer = (e) => {
    setTimer("03:00");
    if (timerRef.current) clearInterval(timerRef.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    timerRef.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 180);
    return deadline;
  };

  const sendEmailVerificationLink = async () => {
    setLoading(true);
    try {
      await sendEmailVerification(auth.currentUser);
    } catch (err) {
      openNotificationError("Error", err.message, "top");
    }
    setLoading(false);
  };

  const resendVerificationLink = () => {
    setTimer("03:00");
    clearTimer(getDeadTime());
    sendEmailVerificationLink();
  };

  useEffect(() => {
    clearTimer(getDeadTime());
    modal.warning(modalConfig);
  }, []);

  useEffect(() => {
    sendEmailVerificationLink();

    const interval = setInterval(() => {
      auth.currentUser.reload().then(() => {
        if (auth.currentUser.emailVerified) {
          setCurrentUser(auth.currentUser);
          localStorage.setItem("accessToken", auth.currentUser.accessToken);
          navigate("/home");
        }
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [setCurrentUser]);

  if (!sendVerificationLink) {
    return <Navigate to="/sign-up" />;
  }

  return (
    <>
      {contextHolder}
      {modalContextHolder}
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-[#7932F5] via-[#F5658C] to-[#F5658C]">
        {loading ? (
          <LoaderModal />
        ) : (
          <div className="max-sm:w-[330px] sm2:w-[360px] sm:w-[460px] md:w-[600px] max-sm:py-8 max-sm:px-5 sm:py-5 sm:px-6 md:px-8 md:py-6 gap-2 bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center">
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
            <div className="max-sm:text-sm md:text-base text-center">
              <p>Your registeration is complete ! </p>
              <p>
                we've sent an email with a verification link to{" "}
                {auth?.currentUser?.email} please confirm it to start using the
                app.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="max-sm:text-sm text-gray-500">
                Haven't received the code yet ?
              </p>
              <button
                disabled={timer ? true : false}
                onClick={() => resendVerificationLink()}
                className="max-sm:text-sm md:text-base p-2 bg-[#7932F5] text-white hover:bg-[#FB3C7F] disabled:bg-red-500 transition-all duration-500 rounded-lg"
              >
                Resend link {timer ? `in ${timer}` : ""}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
