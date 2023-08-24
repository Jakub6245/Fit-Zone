import {
  db,
  dbChatCollection,
  dbClientListCollection,
} from "@/config/firebaseConfig";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

import { ClientListType } from "@/types/ClientListType";
import { ChatListType, ChatType } from "@/types/ChatListTypes";
import { MessageType } from "@/types/MessageType";

export const addChatObjectToDB = async (userId: string) => {
  try {
    const chatObjectRef = doc(dbChatCollection, userId);
    await setDoc(chatObjectRef, { chats: [] });
  } catch (error) {
    console.error(error);
  }
};

export const addClientToChatInDB = async (userId: string, clientId: string) => {
  try {
    const chatObject = (await getUsersChatList(userId)) as ChatListType;

    console.log(chatObject);
    await updateChatObject(userId, {
      chats: [...chatObject.chats, { withWho: clientId, messages: [] }],
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateChatObject = async (
  userId: string,
  chatObject: ChatListType
) => {
  await updateDoc(doc(dbChatCollection, userId), {
    ...chatObject,
  });
};

export const getChatObject = async (userId: string, clientId: string) => {
  try {
    // const isInDB = await isUserInDB(uid);
    const response = await getDoc(doc(dbChatCollection, userId));

    const data = response.data();

    if (!data) return;

    console.log(data);

    const chatObject = data.chats.find(
      (el: ChatType) => el.withWho === clientId
    );
    console.log(chatObject);
    if (!chatObject) return {};

    return chatObject;
  } catch (err) {
    console.error(err);
  }
};

export const getUsersChatList = async (userId: string) => {
  try {
    // const isInDB = await isUserInDB(uid);
    const response = await getDoc(doc(dbChatCollection, userId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const addMessageToChatInDB = async (
  userId: string,
  clientId: string,
  message: MessageType
) => {
  try {
    const chatList = (await getUsersChatList(userId)) as ChatListType;
    const chatObject = (await getChatObject(userId, clientId)) as ChatType;

    const chatIndex = chatList.chats.findIndex(
      (chat) => chat.withWho === chatObject.withWho
    );
    console.log(chatIndex);
    chatList.chats[chatIndex].messages.push(message);
    await updateChatObject(userId, chatList);
  } catch (err) {
    console.error(err);
  }
};
