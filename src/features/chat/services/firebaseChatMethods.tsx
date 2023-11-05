import { db, dbChatCollection } from "@/config/firebaseConfig";
import {
  setDoc,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  collection,
  DocumentData,
  query,
  where,
} from "firebase/firestore";

import { ChatType } from "@/shared/types/ChatListTypes";
import { MessageType } from "@/shared/types/MessageType";

export const addChatObjectToDB = (trainerId: string, clientId: string) => {
  try {
    const chatObjectRef = doc(dbChatCollection);
    setDoc(chatObjectRef, {
      users: [trainerId, clientId],
      messages: [],
    });
    return chatObjectRef.id;
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

export const getChatIdObject = async (userId: string, clientId: string) => {
  try {
    const q = query(
      dbChatCollection,
      where("users", "array-contains", clientId)
    );
    const querySnapshot = await getDocs(q);
    let chatObjectId = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.users.includes(userId)) chatObjectId = doc.id;
    });

    return chatObjectId;
  } catch (err) {
    console.error(err);
  }
};

export const getChatObject = async (userId: string, clientId: string) => {
  try {
    const chatObjectId = await getChatIdObject(userId, clientId);

    const chatData = await getDoc(doc(dbChatCollection, chatObjectId));
    const data = chatData.data();

    return data;
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
    const chatId = await getChatIdObject(userId, chatWithUser);
    if (!chatId) return;
    chatObject.messages.push(message);
    await updateChatObject(chatId, chatObject);
  } catch (err) {
    console.error(err);
  }
};
