import {
  NotificationObjectType,
  NotificationType,
} from "@/types/NotificationType";
import { dbNotificationCollection } from "@/config/firebaseConfig";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { uuid } from "uuidv4";

export const addUsersNotificationListToDB = () => {
  try {
    const notificationListRef = doc(dbNotificationCollection);
    setDoc(notificationListRef, { notifications: [] });
    return notificationListRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const deleteNotificationFromListFromDB = async (
  userId: string,
  notificationId: string
) => {
  try {
    const notifications = (await getNotificationList(
      userId
    )) as NotificationObjectType;
    const indexToRemove = notifications.notifications.findIndex(
      (notification) => notification.id === notificationId
    );
    notifications.notifications.splice(indexToRemove, 1);
    await updateNotificationList(userId, {
      ...notifications,
      notifications: notifications.notifications,
    });
    return notifications;
  } catch (error) {
    console.error(error);
  }
};

export const addNotificationToListToDB = async (
  userId: string,
  newNotification: NotificationType
) => {
  try {
    const notificationList = (await getNotificationList(
      userId
    )) as NotificationObjectType;

    console.log(notificationList);
    await updateNotificationList(userId, {
      ...notificationList,
      notifications: [...notificationList.notifications, newNotification],
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateNotificationList = async (
  userId: string,
  notificationList: NotificationObjectType
) => {
  await updateDoc(doc(dbNotificationCollection, userId), {
    ...notificationList,
  });
};

export const getNotificationList = async (notificationId: string) => {
  try {
    // const isInDB = await isUserInDB(uid);
    const response = await getDoc(
      doc(dbNotificationCollection, notificationId)
    );

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};
