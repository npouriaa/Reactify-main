import { GoPencil } from "react-icons/go";
import { RequestsContext } from "../../../context/RequestsContext";
import { useContext, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Modal, Form, Input, Select, AutoComplete, Tag } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

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

const AboutMe = () => {
  const { currentUser, currentUserDBObj, setLoading } =
    useContext(RequestsContext);
  const [open, setOpen] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const frmRef = useRef();
  const joinDate = currentUser?.metadata.creationTime.split(" ");

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

  const updateUserData = async (values) => {
    const {
      bio,
      phoneNumber,
      location,
      interests,
      web,
      instagram,
      telegram,
      x,
      linkedin,
    } = values;

    setLoading(true);
    try {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        about: {
          bio: bio || currentUserDBObj?.about.bio,
          phoneNumber: phoneNumber || currentUserDBObj?.about.phoneNumber,
          location: location || currentUserDBObj?.about.location,
          interests: interests || currentUserDBObj?.about.interests,
          web: web || currentUserDBObj?.about.web,
          socials: [
            {
              instagram: instagram || currentUserDBObj.about.socials[0].instagram,
            },
            {
              telegram: telegram || currentUserDBObj.about.socials[1].telegram,
            },
            {
              linkedin: linkedin || currentUserDBObj.about.socials[2].linkedin,
            },
            { x: x || currentUserDBObj.about.socials[3].x },
          ],
        },
      });
    } catch (err) {
      console.log(err);
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
    const {
      bio,
      phoneNumber,
      location,
      interests,
      web,
      instagram,
      telegram,
      x,
      linkedin,
    } = values;

    const sanitizedValues = {
      bio: bio || null,
      phoneNumber: phoneNumber || null,
      location: location || null,
      interests: interests || [],
      web: web || null,
      instagram: instagram || null,
      telegram: telegram || null,
      x: x || null,
      linkedin: linkedin || null,
    };

    console.log(currentUserDBObj.about.socials[1].telegram);

    updateUserData(sanitizedValues);
  };

  const getSocialIcon = (socialAppName) => {
    switch (socialAppName) {
      case "instagram":
        return (
          <FaInstagram className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
        );
      case "telegram":
        return (
          <FaTelegram className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
        );
      case "linkedin":
        return (
          <FaLinkedin className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
        );
      case "x":
        return (
          <FaXTwitter className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
        );
      default:
        return null;
    }
  };

  const hasNonEmptyValue = currentUserDBObj?.about?.socials?.some(
    (account) => Object.values(account)[0] !== ""
  );

  return (
    <>
      <div className="flex flex-col gap-4 relative rounded-md bg-white max-sm:order-1 lg:order-2 max-sm:w-full lg:w-2/5 xl:w-1/3 px-7 py-5">
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
          <p className="font-normal break-words">
            {currentUserDBObj?.about.bio}
          </p>
          <div className="flex flex-col gap-3 text-[.9rem] text-[#585858]">
            <p className="font-normal">
              Joined :{" "}
              <span className="text-black ">
                {joinDate[1]} {joinDate[2]} {joinDate[3]}
              </span>
            </p>
            <p className="font-normal">
              Email : <Link className="text-black">{currentUser?.email}</Link>
            </p>
            {currentUserDBObj?.about.phoneNumber && (
              <p className="font-normal">
                Phone :{" "}
                <Link
                  to={`tel:${currentUserDBObj.about.phoneNumber}`}
                  className="text-black"
                >
                  {currentUserDBObj.about.phoneNumber}
                </Link>
              </p>
            )}
            {currentUserDBObj?.about.location && (
              <p className="font-normal">
                Country :{" "}
                <span className="text-black">
                  {currentUserDBObj.about.location}
                </span>
              </p>
            )}
            {currentUserDBObj?.about.web && (
              <p className="font-normal">
                Web :{" "}
                <span className="text-black">{currentUserDBObj.about.web}</span>
              </p>
            )}
            {currentUserDBObj?.about.interests.length !== 0 && (
              <div className="flex items-center gap-1">
                <p className="font-normal flex w-[4.8rem]">Interests :</p>
                <div className="flex gap-[2px] flex-wrap">
                  {currentUserDBObj?.about.interests.map((interest) => (
                    <Tag color={interest.split("-")[1]}>
                      {interest.split("-")[0]}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
            {hasNonEmptyValue && (
              <div className="flex items-center gap-1">
                <p className="font-normal">Socials : </p>
                <span className="text-black flex gap-1">
                  {currentUserDBObj?.about.socials.map((account) => {
                    const platform = Object.keys(account)[0];
                    const link = Object.values(account)[0];
                    return (
                      link && (
                        <Link key={platform} href={link}>
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
        <Modal
          width={700}
          cla
          open={open}
          title="Edit your info"
          onOk={() => handleOk()}
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
                onClick={() => handleOk()}
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
                  <Input
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
                    defaultValue={currentUserDBObj?.about.location}
                    placeholder="Iran"
                  />
                </Form.Item>
                <Form.Item
                  className="max-sm:w-full sm3:w-[48%]"
                  label="Interests :"
                  name="interests"
                >
                  <Select
                    mode="multiple"
                    tagRender={tagRender}
                    options={options}
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
                    options={websiteOptions}
                    onChange={onWebsiteChange}
                    placeholder="Yourwebsite.com"
                    defaultValue={currentUserDBObj?.about.web}
                  >
                    <Input />
                  </AutoComplete>
                </Form.Item>
                <Form.Item
                  className="max-sm:w-full sm3:w-[48%]"
                  label="Instagram :"
                  name="instagram"
                >
                  <Input
                    defaultValue={
                      currentUserDBObj?.about?.socials &&
                      currentUserDBObj.about.socials[0].instagram
                    }
                    placeholder="instagram.com/username"
                  />
                </Form.Item>
                <Form.Item
                  className="max-sm:w-full sm3:w-[48%]"
                  label="Telegram :"
                  name="telegram"
                >
                  <Input
                    defaultValue={
                      currentUserDBObj?.about?.socials &&
                      currentUserDBObj.about.socials[1].telegram
                    }
                    placeholder="t.me/username"
                  />
                </Form.Item>
                <Form.Item
                  className="max-sm:w-full sm3:w-[48%]"
                  label="X (twitter) :"
                  name="x"
                >
                  <Input
                    defaultValue={
                      currentUserDBObj?.about?.socials &&
                      currentUserDBObj.about.socials[2].linkedin
                    }
                    placeholder="x.com/username"
                  />
                </Form.Item>
                <Form.Item
                  className="max-sm:w-full sm3:w-[48%]"
                  label="Linkedin :"
                  name="linkedin"
                >
                  <Input
                    defaultValue={
                      currentUserDBObj?.about?.socials &&
                      currentUserDBObj.about.socials[3].x
                    }
                    placeholder="linkedin.com/in/username"
                  />
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AboutMe;
