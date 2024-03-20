import { notification } from "antd";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.success({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };

  return { openNotification, contextHolder };
};

export default useNotification;
