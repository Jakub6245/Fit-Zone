import { db, dbChatCollection } from "@/config/firebaseConfig";
import {
  setDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
  DocumentData,
} from "firebase/firestore";

import { ChatType } from "@/types/ChatListTypes";
import { MessageType } from "@/types/MessageType";
import { uuid } from "uuidv4";

export const addChatObjectToDB = async (
  trainerId: string,
  clientId: string
) => {
  try {
    const chatId = uuid();
    const chatObjectRef = doc(dbChatCollection, chatId);
    await setDoc(chatObjectRef, {
      id: chatId,
      trainerId,
      clientId,
      messages: [],
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateChatObject = async (
  chatId: string,
  chatObject: ChatType
) => {
  await updateDoc(doc(dbChatCollection, chatId), {
    ...chatObject,
  });
};

export const getAllChats = async () => {
  const docRefs = await getDocs(collection(db, "chat"));

  const res = [] as DocumentData[];

  docRefs.forEach((chat) => {
    res.push(chat.data());
  });

  return res;
};

export const getChatObject = async (trainerId: string, clientId: string) => {
  try {
    const chats = (await getAllChats()) as ChatType[];

    const chatObject = chats.find(
      (el: ChatType) => el.trainerId === trainerId && el.clientId === clientId
    );

    if (!chatObject) return {};

    return chatObject;
  } catch (err) {
    console.error(err);
  }
};

export const addMessageToChatInDB = async (
  userId: string,
  chatWithUser: string,
  message: MessageType
) => {
  try {
    const chatObject = (await getChatObject(userId, chatWithUser)) as ChatType;

    chatObject.messages.push(message);
    await updateChatObject(chatObject.id, chatObject);
  } catch (err) {
    console.error(err);
  }
};
