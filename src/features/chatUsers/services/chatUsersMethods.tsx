import { dbChatUsersListCollection } from "@/config/firebaseConfig";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

import { ChatUsersListType } from "@/shared/types/ClhatUsersListType";

export const addChatUsersListToDB = () => {
  try {
    const chatUsersListRef = doc(dbChatUsersListCollection);
    setDoc(chatUsersListRef, { chatUsersList: [] });
    return chatUsersListRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const deleteChatUserFromListFromDB = async (
  userId: string,
  chatUserId: string
) => {
  try {
    const chatUsersList = (await getChatUsersList(userId)) as ChatUsersListType;
    const indexToRemove = chatUsersList.chatUsersList.findIndex(
      (client) => client === chatUserId
    );
    chatUsersList.chatUsersList.splice(indexToRemove, 1);
    await updateUsersChatUsersList(userId, {
      ...chatUsersList,
      chatUsersList: chatUsersList.chatUsersList,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addChatUserToListToDB = async (
  chatUsersListId: string,
  newClient: string
) => {
  try {
    const chatUsersList = (await getChatUsersList(
      chatUsersListId
    )) as ChatUsersListType;

    await updateUsersChatUsersList(chatUsersListId, {
      ...chatUsersList,
      chatUsersList: [...chatUsersList.chatUsersList, newClient],
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUsersChatUsersList = async (
  userId: string,
  clientList: ChatUsersListType
) => {
  await updateDoc(doc(dbChatUsersListCollection, userId), {
    ...clientList,
  });
};

export const getChatUsersList = async (clientListId: string) => {
  try {
    const response = await getDoc(doc(dbChatUsersListCollection, clientListId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};
