import { ConfigProvider, Form, Input, message } from "antd";
import { useContext, useRef, useState } from "react";
import { Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RequestsContext } from "../../../context/RequestsContext";
import { DarkModeContext } from "../../../context/DarkModeContext";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddPost = () => {
  const { isDark } = useContext(DarkModeContext);
  const { currentUser } = useContext(RequestsContext);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [disable, setDisable] = useState(false);
  const frmRef = useRef();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      className="upload-post-media-btn border-0 text-black dark:text-white"
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleAddPost = async (text) => {
    const postRef = doc(collection(db, "posts"));
    const documentId = postRef.id;

    try {
      const postFileArray = [];
      messageApi.open({
        key: "postUpload",
        type: "loading",
        content: "Uploading your post...",
        duration: 500,
      });
      setDisable(true);
      await Promise.all(
        fileList.map(async (file) => {
          const fileRef = ref(
            storage,
            `postFiles/${file.originFileObj.name}-${documentId}`
          );
          const fileUploadTask = uploadBytesResumable(
            fileRef,
            file.originFileObj
          );
          const fileUploadPromise = new Promise((resolve, reject) => {
            fileUploadTask.on("state_changed", null, reject, () => {
              resolve();
            });
          });
          await fileUploadPromise;
          const fileDownloadURL = await getDownloadURL(
            fileUploadTask.snapshot.ref
          );
          console.log(fileDownloadURL);
          const postFileObj = {
            type: file.type,
            src: fileDownloadURL,
          };
          postFileArray.push(postFileObj);
        })
      );
      if (text !== "" && postFileArray.length > 0) {
        await setDoc(postRef, {
          documentId: documentId,
          uid: currentUser?.uid,
          profilePhoto: currentUser?.photoURL,
          username: currentUser?.displayName,
          text: text,
          postFiles: postFileArray,
          timestamp: serverTimestamp(),
          likes: [],
          comments: [],
        });
        const userRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        const updatedPosts = [
          ...userData.posts,
          {
            documentId: documentId,
            text: text,
            postFiles: postFileArray,
            timestamp: new Date(),
            likes: [],
            comments: [],
          },
        ];

        await updateDoc(userRef, { posts: updatedPosts });
        setFileList([]);
        setPreviewImage(false);
        frmRef.current?.resetFields();
        messageApi.open({
          key: "postUpload",
          type: "success",
          content: "Post uploaded!",
          duration: 5,
        });
        setDisable(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = (values) => {
    // console.log(fileList);
    // console.log(file.type.split("/")[0]);
    handleAddPost(values.post_caption);
  };

  return (
    <>
      {contextHolder}
      <div className="w-full rounded-md bg-white dark:bg-[#111] px-7 py-5 transition-all">
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
            ref={frmRef}
            layout="vertical"
            name="add-post-form"
            onFinish={onFinish}
            className="flex flex-col gap-4 justify-center add-post-form transition-all"
          >
            <div className="w-full flex gap-2 post-caption-con">
              <img
                className="h-10 w-10 border-[1px] rounded-full object-cover"
                src={currentUser?.photoURL}
                alt="user-profile"
              />
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
                <Form.Item
                  className="w-full"
                  required
                  rules={[
                    {
                      required: true,
                      message: "This field can't be empty!",
                    },
                  ]}
                  name="post_caption"
                >
                  <Input.TextArea
                    rows={3}
                    placeholder={`Share what are you thinking ${currentUser?.displayName}...`}
                    maxLength={250}
                    count={{
                      show: true,
                      max: 250,
                    }}
                  />
                </Form.Item>
              </ConfigProvider>
            </div>
            <Form.Item label="Post media" name="post_media">
              <Upload
                onChange={handleChange}
                onPreview={handlePreview}
                listType="picture-card"
                beforeUpload={() => false}
                accept=".jpg,.jpeg,.png,.webp,.mp4,.avi,.mov,.wmv,.webm"
              >
                {fileList?.length >= 4 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <div>
                  {fileList?.map((file) => (
                    <div key={file.uid}>
                      <Image
                        wrapperStyle={{ display: "none" }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) =>
                            !visible && setPreviewImage(""),
                        }}
                        src={previewImage}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Form.Item>
            <button
              disabled={disable && true}
              className="w-40 disabled:bg-red-500 disabled:cursor-not-allowed bg-[#615DFA] text-white hover:bg-[#F5658C] transition-all duration-500 py-2 rounded-lg"
            >
              Share post
            </button>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
};

export default AddPost;
