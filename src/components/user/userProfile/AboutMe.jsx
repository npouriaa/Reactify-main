import { GoPencil } from "react-icons/go";
import { RequestsContext } from "../../../context/RequestsContext";
import { useContext, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  Modal,
  Form,
  Input,
  Select,
  AutoComplete,
  Tag,
  ConfigProvider,
  message,
} from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { DarkModeContext } from "../../../context/DarkModeContext";

const options = [
  {
    value: "Sport-magenta",
    label: "Sport",
  },
  {
    value: "Food-volcano",
    label: "Food",
  },
  {
    value: "Music-orange",
    label: "Music",
  },
  {
    value: "Movies-cyan",
    label: "Movies",
  },
  {
    value: "Fashion-lime",
    label: "Fashion",
  },
  {
    value: "Travel-red",
    label: "Travel",
  },
  {
    value: "Art-green",
    label: "Art",
  },
  {
    value: "Technology-purple",
    label: "Technology",
  },
  {
    value: "Books-blue",
    label: "Books",
  },
  {
    value: "Gaming-geekblue",
    label: "Gaming",
  },
];

const tagRender = ({ value, closable, onClose }) => {
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value.split("-")[1]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginInlineEnd: 4,
        marginBottom: 4,
      }}
    >
      {value.split("-")[0]}
    </Tag>
  );
};

const AboutMe = ({ userData }) => {
  const { currentUser, currentUserDBObj, setLoading } =
    useContext(RequestsContext);
  const { isDark } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const frmRef = useRef();
  const bioRef = useRef();
  const phoneNumberRef = useRef();
  const locationRef = useRef();
  const webRef = useRef();
  const instagramRef = useRef();
  const telegramRef = useRef();
  const xRef = useRef();
  const linkedinRef = useRef();

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".ir", ".dev", ".org", ".net"].map(
          (domain) => `${value}${domain}`
        )
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const updateUserData = async (interests) => {
    setLoading(true);
    try {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        about: {
          bio: bioRef.current.resizableTextArea.textArea.value,
          phoneNumber: phoneNumberRef.current.input.value,
          location: locationRef.current.input.value,
          interests: interests || currentUserDBObj?.about.interests,
          web: webRef.current.input.value,
          socials: [
            {
              instagram: instagramRef.current.input.value,
            },
            {
              telegram: telegramRef.current.input.value,
            },
            {
              linkedin: linkedinRef.current.input.value,
            },
            { x: xRef.current.input.value },
          ],
        },
      });
    } catch (err) {
      console.log(err);
      messageApi.open({
        key: "updateError",
        type: "error",
        content: err.message,
        duration: 4,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    frmRef.current.submit();
  };

  const handleCancel = () => {
    setOpen(false);
    frmRef.current?.resetFields();
  };

  const onFinish = (values) => {
    const interests = values.interests || [];
    updateUserData(interests);
  };

  const getSocialIcon = (socialAppName) => {
    switch (socialAppName) {
      case "instagram":
        return <FaInstagram className="w-5 h-5" />;
      case "telegram":
        return <FaTelegram className="w-5 h-5" />;
      case "linkedin":
        return <FaLinkedin className="w-5 h-5" />;
      case "x":
        return <FaXTwitter className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const hasNonEmptyValue = userData?.about?.socials?.some(
    (account) => Object.values(account)[0] !== ""
  );

  return (
    <div className="flex flex-col gap-4 relative transition-all rounded-md bg-white dark:bg-[#111]  px-7 py-5">
      {contextHolder}
      <div className="w-full h-9 flex item-center justify-between">
        <h3 className="dark:text-white transition-all text-[1.05rem] relative after:absolute after:bottom-0 after:left-0 after:rounded-md after:h-1 after:w-3 after:bg-[#615DFA] before:absolute before:bottom-0 before:left-4 before:h-1 before:rounded-md before:w-6 before:bg-[#615DFA]">
          About Me
        </h3>
        {userData?.uid === currentUserDBObj?.uid && (
          <button
            onClick={showModal}
            className="p-2 shadow-3xl rounded-full bg-white hover:bg-[#d7d7d7] transition-all duration-300"
          >
            <GoPencil className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="w-full gap-4 flex flex-col ">
        <p className="font-normal break-words dark:text-white transition-all">
          {userData?.about.bio}
        </p>
        <div className="flex flex-col gap-3 text-[.9rem] text-[#585858]">
          <p className="font-normal dark:text-[#aeaeae] transition-all">
            Joined :{" "}
            <span className="text-black dark:text-white transition-all">
              {userData?.creationTime.split(" ")[2]}{" "}
              {userData?.creationTime.split(" ")[3]}
            </span>
          </p>
          <div className="font-normal dark:text-[#aeaeae] transition-all">
            Email :{" "}
            <Link
              to={`mailto:${userData?.email}`}
              target="_blank"
              className="text-black dark:text-white transition-all dark:hover:text-[#69b1ff]"
            >
              {userData?.email}
            </Link>
          </div>
          {userData?.about.phoneNumber && (
            <p className="font-normal dark:text-[#aeaeae] transition-all">
              Phone :{" "}
              <Link
                to={`tel:${userData.about.phoneNumber}`}
                className="text-black dark:text-white transition-all dark:hover:text-[#69b1ff]"
              >
                {userData.about.phoneNumber}
              </Link>
            </p>
          )}
          {userData?.about.location && (
            <p className="font-normal dark:text-[#aeaeae] transition-all">
              Country :{" "}
              <span className="text-black dark:text-white transition-all">
                {userData.about.location}
              </span>
            </p>
          )}
          {userData?.about.web && (
            <p className="font-normal dark:text-[#aeaeae] transition-all">
              Web :{" "}
              <Link
                target="_blank"
                to={`https://${userData.about.web}`}
                className="text-black dark:text-white transition-all dark:hover:text-[#69b1ff]"
              >
                {userData.about.web}
              </Link>
            </p>
          )}
          {userData?.about.interests.length !== 0 && (
            <div className="flex items-center gap-1">
              <div>
                <p className="font-normal dark:text-[#aeaeae] transition-all flex w-[4.8rem]">
                  Interests :
                </p>
              </div>
              <div className="flex gap-[2px] flex-wrap">
                {userData?.about.interests.map((interest, index) => (
                  <Tag key={index} color={interest.split("-")[1]}>
                    {interest.split("-")[0]}
                  </Tag>
                ))}
              </div>
            </div>
          )}
          {hasNonEmptyValue && (
            <div className="flex items-center gap-1">
              <p className="font-normal dark:text-[#aeaeae] transition-all">
                Socials :{" "}
              </p>
              <span className="text-black dark:text-white transition-all flex gap-1">
                {userData?.about.socials.map((account) => {
                  const platform = Object.keys(account)[0];
                  const link = Object.values(account)[0];
                  return (
                    link && (
                      <Link
                        className="text-[#585858] dark:text-white transition-all duration-200 dark:hover:text-[#69b1ff]"
                        target="_blank"
                        key={platform}
                        to={`https://${link}`}
                      >
                        {getSocialIcon(platform)}
                      </Link>
                    )
                  );
                })}
              </span>
            </div>
          )}
        </div>
      </div>
      {userData?.uid === currentUserDBObj?.uid && (
        <ConfigProvider
          theme={{
            components: {
              Modal: {
                contentBg: isDark ? "#111" : "#fff",
                headerBg: isDark ? "#111" : "#fff",
                titleColor: isDark ? "#fff" : "#000",
              },
            },
          }}
        >
          <Modal
            width={700}
            open={open}
            title="Edit your info"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={() => (
              <div className="flex max-sm:flex-col max-sm3:flex-row gap-4 justify-end">
                <button
                  onClick={handleCancel}
                  className="px-4 py-1 text-white rounded-md bg-[#615DFA] hover:bg-[#F5658C] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOk}
                  className="px-4 py-1 text-white rounded-md bg-[#615DFA] hover:bg-[#F5658C] transition-all"
                >
                  Done
                </button>
              </div>
            )}
          >
            <div className="flex flex-col gap-3">
              <ConfigProvider
                theme={{
                  components: {
                    Form: {
                      labelColor: isDark ? "#fff" : "#000",
                    },
                  },
                }}
              >
                <Form
                  onFinish={onFinish}
                  ref={frmRef}
                  className=" flex flex-col"
                  layout="vertical"
                  name="register_form"
                >
                  <ConfigProvider
                    theme={{
                      token: {
                        colorBgContainer: isDark ? "#111" : "#fff",
                        colorBorder: isDark && "#585858",
                        colorText: isDark ? "#fff" : "#000",
                        colorFillTertiary: "red",
                      },
                    }}
                  >
                    <Form.Item className="text-white" label="Bio :" name="bio">
                      <Input.TextArea
                        ref={bioRef}
                        value={currentUserDBObj?.about.bio}
                        defaultValue={currentUserDBObj?.about.bio}
                        placeholder="Write about yourself"
                        rows={3}
                        maxLength={500}
                        count={{
                          show: true,
                          max: 500,
                        }}
                      />
                    </Form.Item>
                  </ConfigProvider>
                  <div className="w-full justify-between flex items-center flex-wrap">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorBgContainer: isDark ? "#111" : "#fff",
                          colorBorder: isDark ? "#585858" : "#d9d9d9",
                          colorText: isDark ? "#fff" : "#000",
                        },
                      }}
                    >
                      <Form.Item
                        className="max-sm:w-full sm3:w-[48%]"
                        label="Phone number:"
                        name="phoneNumber"
                        rules={[
                          {
                            pattern: /^\d+$/,
                            message: "Please input only numbers!",
                          },
                        ]}
                      >
                        <Input
                          ref={phoneNumberRef}
                          className="placeholder:text-[#959595] dark:text-white"
                          style={{ background: "transparent" }}
                          defaultValue={currentUserDBObj?.about.phoneNumber}
                          placeholder="989124208975"
                        />
                      </Form.Item>
                      <Form.Item
                        className="max-sm:w-full sm3:w-[48%]"
                        label="Location :"
                        name="location"
                      >
                        <Input
                          ref={locationRef}
                          className="placeholder:text-[#959595] dark:text-white"
                          style={{ background: "transparent" }}
                          defaultValue={currentUserDBObj?.about.location}
                          placeholder="Iran"
                        />
                      </Form.Item>
                      <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              optionActiveBg: isDark
                                ? "#303030"
                                : "rgba(0, 0, 0, 0.04)",
                              optionSelectedBg: isDark ? "#111A2C" : "#e6f4ff",
                              optionSelectedFontWeight: "100",
                            },
                          },
                        }}
                      >
                        <Form.Item
                          className="max-sm:w-full sm3:w-[48%]"
                          label="Interests :"
                          name="interests"
                        >
                          <Select
                            mode="multiple"
                            tagRender={tagRender}
                            options={options}
                            dropdownStyle={{
                              background: isDark ? "#111" : "#fff",
                            }}
                            defaultValue={currentUserDBObj?.about?.interests?.map(
                              (interest) => ({
                                value: interest,
                                label: interest.split("-")[0],
                              })
                            )}
                          />
                        </Form.Item>
                        <Form.Item
                          className="max-sm:w-full sm3:w-[48%]"
                          label="Web :"
                          name="web"
                        >
                          <AutoComplete
                            dropdownStyle={{
                              background: isDark ? "#111" : "#fff",
                            }}
                            options={websiteOptions}
                            onChange={onWebsiteChange}
                            defaultValue={currentUserDBObj?.about.web}
                          >
                            <Input
                              placeholder="Yourwebsite.com"
                              className="placeholder:text-[#959595] dark:text-white"
                              style={{ background: "transparent" }}
                              ref={webRef}
                            />
                          </AutoComplete>
                        </Form.Item>
                      </ConfigProvider>
                      <Form.Item
                        className="max-sm:w-full sm3:w-[48%]"
                        label="Instagram :"
                        name="instagram"
                        rules={[
                          {
                            validator: (_, value) => {
                              if (
                                value &&
                                (value.startsWith("https://") ||
                                  value.startsWith("http://"))
                              ) {
                                return Promise.reject(
                                  `Please don't include "https://" or "http://" at the beginning`
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input
                          ref={instagramRef}
                          defaultValue={
                            currentUserDBObj?.about?.socials &&
                            currentUserDBObj.about.socials[0].instagram
                          }
                          placeholder="instagram.com/username"
                          className="placeholder:text-[#959595] dark:text-white"
                          style={{ background: "transparent" }}
                        />
                      </Form.Item>
                      <Form.Item
                        className="max-sm:w-full sm3:w-[48%]"
                        label="Telegram :"
                        name="telegram"
                        rules={[
                          {
                            validator: (_, value) => {
                              if (
                                value &&
                                (value.startsWith("https://") ||
                                  value.startsWith("http://"))
                              ) {
                                return Promise.reject(
                                  `Please don't include "https://" or "http://" at the beginning`
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input
                          ref={telegramRef}
                          className="placeholder:text-[#959595] dark:text-white"
                          style={{ background: "transparent" }}
                          defaultValue={
                            currentUserDBObj?.about?.socials &&
                            currentUserDBObj.about.socials[1].telegram
                          }
                          placeholder="t.me/username"
                        />
                      </Form.Item>
                      <Form.Item
                        className="max-sm:w-full sm3:w-[48%]"
                        label="Linkedin :"
                        name="linkedin"
                        rules={[
                          {
                            validator: (_, value) => {
                              if (
                                value &&
                                (value.startsWith("https://") ||
                                  value.startsWith("http://"))
                              ) {
                                return Promise.reject(
                                  `Please don't include "https://" or "http://" at the beginning`
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input
                          ref={linkedinRef}
                          className="placeholder:text-[#959595] dark:text-white"
                          style={{ background: "transparent" }}
                          defaultValue={
                            currentUserDBObj?.about?.socials &&
                            currentUserDBObj.about.socials[2].linkedin
                          }
                          placeholder="linkedin.com/in/username"
                        />
                      </Form.Item>
                      <Form.Item
                        className="max-sm:w-full sm3:w-[48%]"
                        label="X (twitter) :"
                        name="x"
                        rules={[
                          {
                            validator: (_, value) => {
                              if (
                                value &&
                                (value.startsWith("https://") ||
                                  value.startsWith("http://"))
                              ) {
                                return Promise.reject(
                                  `Please don't include "https://" or "http://" at the beginning`
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input
                          ref={xRef}
                          className="placeholder:text-[#959595] dark:text-white"
                          style={{ background: "transparent" }}
                          defaultValue={
                            currentUserDBObj?.about?.socials &&
                            currentUserDBObj.about.socials[3].x
                          }
                          placeholder="x.com/username"
                        />
                      </Form.Item>
                    </ConfigProvider>
                  </div>
                </Form>
              </ConfigProvider>
            </div>
          </Modal>
        </ConfigProvider>
      )}
    </div>
  );
};

export default AboutMe;
