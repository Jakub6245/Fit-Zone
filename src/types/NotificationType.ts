export type NotificationType = {
  id: string;
  from: string;
  message: string;
};

export type NotificationObjectType = {
  notifications: NotificationType[];
  userId: string;
};
