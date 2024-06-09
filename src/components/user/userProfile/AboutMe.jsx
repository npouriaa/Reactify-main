import { GoPencil } from "react-icons/go";
import { RequestsContext } from "../../../context/RequestsContext";
import { useContext, useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Modal, Form, Input, Select, AutoComplete, Tag } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import LoaderModal from "../../LoaderModal";

const options = [
  {
    value: "Sport",
    label: "magenta",
  },
  {
    value: "Food",
    label: "volcano",
  },
  {
    value: "Music",
    label: "orange",
  },
  {
    value: "Movies",
    label: "cyan",
  },
  {
    value: "Fashion",
    label: "lime",
  },
  {
    value: "Travel",
    label: "red",
  },
  {
    value: "Art",
    label: "green",
  },
  {
    value: "Technology",
    label: "purple",
  },
  {
    value: "Books",
    label: "blue",
  },
  {
    value: "Gaming",
    label: "geekblue",
  },
];

const tagRender = ({ label, value, closable, onClose }) => {
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={label}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginInlineEnd: 4,
        marginBottom : 4
      }}
    >
      {value}
    </Tag>
  );
};

const AboutMe = () => {
  const { currentUser, loading, setLoading } = useContext(RequestsContext);
  const joinDate = currentUser?.metadata.creationTime.split(" ");
  const [open, setOpen] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const frmRef = useRef();

  const getUserData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

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

  const showModal = () => {
    setOpen(true);
    frmRef.current?.resetFields();
  };

  const handleOk = () => {
    setOpen(false);
    frmRef.current?.resetFields();
  };

  const handleCancel = () => {
    setOpen(false);
    frmRef.current?.resetFields();
  };

  const onFinish = (values) => {
    console.log(values);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-[22.4rem] gap-4 relative rounded-md bg-white max-sm:order-1 lg:order-2 max-sm:w-full lg:w-2/5 xl:w-1/3 px-7 py-5">
        {loading ? (
          <LoaderModal fullSize={true} customeStyle="rounded-md" />
        ) : (
          <>
            <div className="w-full h-9 flex item-center justify-between">
              <h3 className="text-[1.05rem] relative after:absolute after:bottom-0 after:left-0 after:rounded-md after:h-1 after:w-3 after:bg-[#615DFA] before:absolute before:bottom-0 before:left-4 before:h-1 before:rounded-md before:w-6 before:bg-[#615DFA]">
                About Me
              </h3>
              <button
                onClick={showModal}
                className="p-2 shadow-3xl rounded-full bg-white hover:bg-[#d7d7d7] transition-all duration-300"
              >
                <GoPencil className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full gap-4 flex flex-col ">
              <p className="font-normal break-words">sasas.s;a;lss;dlsdlskds</p>
              <div className="flex flex-col gap-3 text-[.9rem] text-[#585858]">
                <p className="font-normal">
                  Joined :{" "}
                  <span className="text-black ">
                    {joinDate[1]} {joinDate[2]} {joinDate[3]}
                  </span>
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  <p className="font-normal">Interests :</p>
                  <div className="flex gap-[2px] flex-wrap">
                    <Tag color="magenta">Sport</Tag>
                    <Tag color="cyan">Movies</Tag>
                    <Tag color="geekblue">Gaming</Tag>
                  </div>
                </div>
                <p className="font-normal">
                  Email :{" "}
                  <Link className="text-black">{currentUser?.email}</Link>
                </p>
                <p className="font-normal">
                  Phone : <Link className="text-black">+989395362203</Link>
                </p>
                <p className="font-normal">
                  Country : <span className="text-black">Iran</span>
                </p>
                <p className="font-normal">
                  Web : <span className="text-black">me.com</span>
                </p>
                <p className="font-normal flex items-center gap-1">
                  Socials :{" "}
                  <span className="text-black flex gap-1">
                    <Link>
                      <FaInstagram className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
                    </Link>
                    <Link>
                      <FaTelegram className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
                    </Link>
                    <Link>
                      <FaLinkedin className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
                    </Link>
                    <Link>
                      <FaXTwitter className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
                    </Link>
                  </span>
                </p>
              </div>
            </div>
            <Modal
              width={700}
              cla
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
                  onClick={() => frmRef.current.submit()}
                  type="submit"
                    className="px-4 py-1 text-white rounded-md bg-[#615DFA] hover:bg-[#F5658C] transition-all"
                  >
                    Donedsdsds
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
                <Form
                  onFinish={onFinish}
                  ref={frmRef}
                  className=" flex flex-col"
                  layout="vertical"
                  name="register_form"
                >
                  <Form.Item label="Bio :" name="bio">
                    <Input.TextArea
                      placeholder="Write about yourself"
                      rows={3}
                      maxLength={500}
                      count={{
                        show: true,
                        max: 500,
                      }}
                    />
                  </Form.Item>
                  <div className="w-full justify-between flex items-center flex-wrap">
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
                      <Input placeholder="+989124208975" />
                    </Form.Item>
                    <Form.Item
                      className="max-sm:w-full sm3:w-[48%]"
                      label="Location :"
                      name="Location"
                    >
                      <Input placeholder="Iran" />
                    </Form.Item>
                    <Form.Item
                      className="max-sm:w-full sm3:w-[48%]"
                      label="Interests :"
                      name="Interests"
                    >
                      <Select
                        mode="multiple"
                        tagRender={tagRender}
                        options={options}
                      />
                    </Form.Item>
                    <Form.Item
                      className="max-sm:w-full sm3:w-[48%]"
                      label="Web :"
                      name="Web"
                    >
                      <AutoComplete
                        options={websiteOptions}
                        onChange={onWebsiteChange}
                        placeholder="Yourwebsite.com"
                      >
                        <Input />
                      </AutoComplete>
                    </Form.Item>
                    <Form.Item
                      className="max-sm:w-full sm3:w-[48%]"
                      label="Instagram :"
                      name="Instagram"
                    >
                      <Input placeholder="instagram.com/username" />
                    </Form.Item>
                    <Form.Item
                      className="max-sm:w-full sm3:w-[48%]"
                      label="X (twtter) :"
                      name="X (twtter)"
                    >
                      <Input placeholder="x.com/username" />
                    </Form.Item>
                    <Form.Item
                      className="max-sm:w-full sm3:w-[48%]"
                      label="Telegram :"
                      name="Telegram"
                    >
                      <Input placeholder="t.me/username" />
                    </Form.Item>
                    <Form.Item
                      className="max-sm:w-full sm3:w-[48%]"
                      label="Linkedin :"
                      name="Linkedin"
                    >
                      <Input placeholder="linkedin.com/in/username" />
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default AboutMe;
