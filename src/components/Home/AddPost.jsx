import { Form, Input } from "antd";
import { useState } from "react";
import { Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddPost = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

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
      className="upload-post-media-btn"
      style={{
        border: 0,
        background: "none",
      }}
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

  const onFinish = (values) => {
    console.log(values);
    console.log(fileList);
  };

  return (
    <div className="w-full rounded-md bg-white p-4">
      <Form
        layout="vertical"
        name="add-post-form"
        onFinish={onFinish}
        className="flex flex-col gap-4 justify-center add-post-form"
      >
        <Form.Item
          required
          rules={[
            {
              required: true,
              message: "This field can't be empty!",
            },
          ]}
          name="post_caption"
        >
          <Input.TextArea placeholder="Share what are you thinking..." />
        </Form.Item>
        <Form.Item
          label="Post media"
          name="post_media"
        >
          <Upload
            onChange={handleChange}
            onPreview={handlePreview}
            listType="picture-card"
            beforeUpload={() => false}
            accept=".jpg,.jpeg,.png,.webp,.mp4,.avi,.mov,.wmv,.webm"
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <div>
              {fileList.map((file) => (
                <div key={file.uid}>
                  {file.type.startsWith("video/") ? (
                    <video
                      src={file.url}
                      controls
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
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
                  )}
                </div>
              ))}
            </div>
          )}
        </Form.Item>
        <button className="w-40 bg-[#7932F5] text-white hover:bg-[#FB3C7F] transition-all duration-500 py-2 rounded-lg">Share post</button>
      </Form>
    </div>
  );
};

export default AddPost;