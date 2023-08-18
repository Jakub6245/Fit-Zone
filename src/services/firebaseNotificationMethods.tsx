import {
  NotificationObjectType,
  NotificationType,
} from "@/types/NotificationType";
import { dbNotificationCollection } from "@/config/firebaseConfig";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export const addUsersNotificationListToDB = (userId: string) => {
  try {
    const notificationListRef = doc(dbNotificationCollection, userId);
    setDoc(notificationListRef, { notifications: [] });
  } catch (error) {
    console.error(error);
  }
};

export const deleteNotificationFromListFromDB = async (
  userId: string,
  notificationId: string
) => {
  try {
    const { notifications } = (await getNotificationList(
      userId
    )) as NotificationObjectType;
    const indexToRemove = notifications.findIndex(
      (notification) => notification.id === notificationId
    );
    notifications.splice(indexToRemove, 1);
    await updateNotificationList(userId, {
      notifications: notifications,
    });
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

export const getNotificationList = async (userId: string) => {
  try {
    // const isInDB = await isUserInDB(uid);
    const response = await getDoc(doc(dbNotificationCollection, userId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};
