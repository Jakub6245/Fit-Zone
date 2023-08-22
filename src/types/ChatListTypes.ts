import { MessageType } from "./MessageType";

export type ChatListType = {
  chats: ChatType[];
};

export type ChatType = { withWho: string; messages: MessageType[] };
