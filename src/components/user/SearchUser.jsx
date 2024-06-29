import { collection, getDocs, query, where } from "firebase/firestore";
import { IoSearchOutline } from "react-icons/io5";
import { db } from "../../firebase";
import { message } from "antd";
import { useState } from "react";
import RequestsLoader from "./RequestsLoader";

const SearchUser = ({ styles }) => {
  const [username, setUserName] = useState("");
  const [users, setUser] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const getSerachedUser = async () => {
    if (username !== "") {
      setLoading(true);
      try {
        const querySnapShot = await getDocs(collection(db, "users"));
        querySnapShot.forEach((doc) => {
          const user = doc.data();
          if (user.displayName.toLowerCase() === username.toLowerCase()) {
            setUser(user);
            console.log(user);
          }
        });
      } catch (err) {
        console.log(err);
        messageApi.open({
          key: "searchError",
          type: "error",
          content: err.message,
          duration: 4,
        });
        setLoading(false);
      }
      setLoading(false);
    } else {
      messageApi.open({
        key: "searchError",
        type: "error",
        content: "Search Input can't br empty !",
        duration: 4,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div
        className={`${styles} h-full px-3 py-[.2rem] items-center transition-all dark:bg-[#111] bg-white rounded-3xl overflow-hidden`}
      >
        {loading ? (
          <RequestsLoader />
        ) : (
          <button onClick={() => getSerachedUser()}>
            <IoSearchOutline color="#615DFA" size={25} />
          </button>
        )}

        <input
          placeholder="Search for friends..."
          className="w-[90%] transition-all dark:text-white dark:placeholder:text-white dark:bg-[#111] py-2 px-2 text-sm header-search-input"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
    </>
  );
};

export default SearchUser;
