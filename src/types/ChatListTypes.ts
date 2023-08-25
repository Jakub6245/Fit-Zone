import { MessageType } from "./MessageType";

export type ChatType = {
  id: string;
  trainerId: string;
  clientId: string;
  messages: MessageType[];
};
