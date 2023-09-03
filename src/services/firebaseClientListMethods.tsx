import { db, dbClientListCollection } from "@/config/firebaseConfig";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

import { ClientListType } from "@/types/ClientListType";

export const addUsersClientListToDB = () => {
  try {
    const clientListRef = doc(dbClientListCollection);
    setDoc(clientListRef, { clientList: [] });
    return clientListRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const deleteClientFromListFromDB = async (
  userId: string,
  clientId: string
) => {
  try {
    const clientList = (await getClientList(userId)) as ClientListType;
    const indexToRemove = clientList.clientList.findIndex(
      (client) => client === clientId
    );
    clientList.clientList.splice(indexToRemove, 1);
    await updateUsersClientList(userId, {
      ...clientList,
      clientList: clientList.clientList,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addClientToListToDB = async (
  clientListId: string,
  newClient: string
) => {
  try {
    const clientList = (await getClientList(clientListId)) as ClientListType;

    console.log(clientList);
    await updateUsersClientList(clientListId, {
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
  await updateDoc(doc(dbClientListCollection, userId), {
    ...clientList,
  });
};

export const getClientList = async (clientListId: string) => {
  try {
    // const isInDB = await isclientListInDB(uid);
    const response = await getDoc(doc(dbClientListCollection, clientListId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};
