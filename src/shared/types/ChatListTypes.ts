import { MessageType } from "./MessageType";

export type ChatType = {
  users: string[];
  messages: MessageType[];
};
