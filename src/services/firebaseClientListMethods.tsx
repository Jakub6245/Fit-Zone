import { db, dbClientListCollection } from "@/config/firebaseConfig";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

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
