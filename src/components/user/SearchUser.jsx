import { collection, getDocs, query, where } from "firebase/firestore";
import { IoSearchOutline } from "react-icons/io5";
import { db } from "../../firebase";
import { message } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import RequestsLoader from "./RequestsLoader";
import { RequestsContext } from "../../context/RequestsContext";
import { Link } from "react-router-dom";

const SearchUser = ({ styles, bioWidth }) => {
  const [username, setUserName] = useState("");
  const { currentUser } = useContext(RequestsContext);
  const [users, setUsers] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const searchConref = useRef();

  const getSerachedUser = async (e) => {
    e.preventDefault()
    if (username !== "") {
      setShow(true);

      setLoading(true);
      try {
        const querySnapShot = await getDocs(collection(db, "users"));
        const users = [];
        querySnapShot.forEach((doc) => {
          const user = doc.data();
          if (user.displayName.toLowerCase() === username.toLowerCase()) {
            users.push(user);
          }
        });

        setUsers(users);
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
        content: "Search Input can't be empty !",
        duration: 4,
      });
    }
  };

  useEffect(() => {
    const checkClickOutSide = (e) => {
      if (
        show &&
        searchConref.current &&
        !searchConref.current.contains(e.target) &&
        !searchConref.current.previousElementSibling.contains(e.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", checkClickOutSide);

    return () => {
      document.removeEventListener("mousedown", checkClickOutSide);
    };
  }, [show]);

  return (
    <>
      {contextHolder}
      <div
        className={`${styles} relative px-3 py-[.2rem] items-center transition-all dark:bg-[#111] bg-white rounded-3xl`}
      >
        <form className="flex items-center">
          {loading ? (
            <RequestsLoader />
          ) : (
            <button type="submit" onClick={(e) => getSerachedUser(e)}>
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
        </form>
        {show && (
          <div
            ref={searchConref}
            className="z-10 absolute w-full bg-white dark:bg-[#111] transition-all rounded-2xl top-12 left-0"
          >
            {users.length === 0 && !loading ? (
              <p className="p-3 text-[#858585]">No users found.</p>
            ) : (
              users?.map((user) => (
                <div key={user?.uid} className="py-3">
                  <div className="flex w-full h-14 dark:text-white items-center gap-3 p-2">
                    <Link
                      to={`/${currentUser?.displayName}/profile/${user?.uid}`}
                      className="relative flex justify-center items-center h-14 w-14 p-[5px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:transition-all after:ease-in-out after:right-0 after:bg-[url('../../assets/images/user/border-gray.png')] before:absolute before:z-10 before:right-0 before:top-0 before:transition-all before:rotate-[30deg] before:opacity-0 before:bg-[url('../../assets/images/user/border-purple.png')] before:bg-cover before:bg-no-repeat before:ease-linear before:w-full before:h-full hover:before:opacity-100 hover:before:rotate-0"
                    >
                      <img
                        src={user?.photoURL}
                        className="object-cover rounded-full h-full"
                        alt="user-profile"
                      />
                    </Link>
                    <div className="flex flex-col items-start">
                      <Link
                        to={`/${currentUser?.displayName}/profile/${user?.uid}`}
                        className="transition-all"
                      >
                        {user?.displayName}
                      </Link>
                      <p
                        className={`text-[#858585] text-xs truncate ${bioWidth}`}
                      >
                        {user?.about?.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchUser;
