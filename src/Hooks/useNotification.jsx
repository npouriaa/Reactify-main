import { notification } from "antd";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationSuccess = (message, description, placement) => {
    api.success({
      message: `${message}`,
      description: `${description}`,
      placement,
    });
  };

  const openNotificationError = (message, description, placement) => {
    api.error({
      message: `${message}`,
      description: `${description}`,
      placement,
    });
  };

  return { openNotificationSuccess, openNotificationError, contextHolder };
};

export default useNotification;
