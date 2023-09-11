import { MessageType } from "@/shared/types/MessageType";

export const ChatMessage = ({ message }: { message: MessageType }) => {
  return <div>{message.content}</div>;
};

export default ChatMessage;
