import { NotificationType } from "@/types/NotificationType";
import { getUserFromFirebase, updateUser } from "./firebaseUserMethods";
import { UserObjectType } from "@/types/UserType";
import { auth } from "@/config/firebaseConfig";

export const addNotificationToDB = async (
  userId: string,
  data: NotificationType
) => {
  try {
    const user = (await getUserFromFirebase(userId)) as UserObjectType;
    updateUser(userId, {
      ...user,
      notifications: [...user.notifications, data],
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotificationFromDB = async (notificationId: string) => {
  try {
    if (!auth.currentUser) return;
    const user = (await getUserFromFirebase(
      auth.currentUser.uid
    )) as UserObjectType;
    await updateUser(auth.currentUser.uid, {
      ...user,
      notifications: removeNotificaitonFromArray(
        user.notifications,
        notificationId
      ),
    });
  } catch (error) {
    console.log(error);
  }
};

const removeNotificaitonFromArray = (
  array: NotificationType[],
  elementId: string
) => {
  const removeIndex = array.findIndex((el) => el.id === elementId);
  if (removeIndex === -1) return array;
  array.splice(removeIndex, 1);

  return array;
};
