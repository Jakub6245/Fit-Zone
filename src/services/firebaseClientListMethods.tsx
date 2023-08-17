import { NotificationType } from "@/types/NotificationType";
import { getUserFromFirebase, updateUser } from "./firebaseUserMethods";
import { UserObjectType } from "@/types/UserType";
import {
  auth,
  dbNotificationCollection,
  db,
  dbClientListCollection,
} from "@/config/firebaseConfig";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { notifications } from "./notifications";
import { ClientListType } from "@/types/ClientListType";

export const addUsersClientListToDB = async (userId: string) => {
  try {
    const clientListRef = doc(dbClientListCollection, userId);
    await setDoc(clientListRef, { clientList: [] });
  } catch (error) {
    console.error(error);
  }
};

export const deleteClientFromListFromDB = async (
  userId: string,
  clientId: string
) => {
  try {
    const { clientList } = (await getClientList(userId)) as ClientListType;
    const indexToRemove = clientList.findIndex((client) => client === clientId);
    clientList.splice(indexToRemove, 1);
    await updateUsersClientList(userId, {
      clientList: clientList,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addClientToListToDB = async (
  userId: string,
  newClient: string
) => {
  try {
    const clientList = (await getClientList(userId)) as ClientListType;

    console.log(clientList);
    await updateUsersClientList(userId, {
      ...clientList,
      clientList: [...clientList.clientList, newClient],
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUsersClientList = async (
  userId: string,
  clientList: ClientListType
) => {
  await updateDoc(doc(db, "clientList", userId), {
    ...clientList,
  });
};

export const getClientList = async (userId: string) => {
  try {
    // const isInDB = await isUserInDB(uid);
    const response = await getDoc(doc(db, "clientList", userId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};
// export const addClientListToDB = async (
//   userId: string,
//   data: ClientListType
// ) => {
//   try {
//     const user = (await getUserFromFirebase(userId)) as UserObjectType;
//     updateUser(userId, {
//       ...user,
//       notifications: [...user.notifications, data],
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteNotificationFromDB = async (notificationId: string) => {
//   try {
//     if (!auth.currentUser) return;
//     const user = (await getUserFromFirebase(
//       auth.currentUser.uid
//     )) as UserObjectType;
//     await updateUser(auth.currentUser.uid, {
//       ...user,
//       notifications: removeNotificaitonFromArray(
//         user.notifications,
//         notificationId
//       ),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const removeNotificaitonFromArray = (
//   array: NotificationType[],
//   elementId: string
// ) => {
//   const removeIndex = array.findIndex((el) => el.id === elementId);
//   if (removeIndex === -1) return array;
//   array.splice(removeIndex, 1);

//   return array;
// };
