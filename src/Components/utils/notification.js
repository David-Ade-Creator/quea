import { notification } from 'antd';

export const openNotification = (title,description) => {
  notification.open({
    message: title,
    description: description,
  });
};
