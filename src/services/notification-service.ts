import { notification } from 'antd';
import { ReactNode } from 'react';
import { INotificationType } from '../types/file-types';

export default class NotificationService {
  constructor(waitTime = 4.5) {
    notification.config({
      duration: waitTime,
    });
  }

  openNotification = (type: INotificationType, title: string, description: ReactNode | string) => {
    notification[type]({
      message: title,
      description,
    });
  };
}
