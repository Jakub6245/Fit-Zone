import { MessageType } from "@/types/MessageType";

const ChatMessage = ({ message }: { message: MessageType }) => {
  return <div>{message.content}</div>;
};

export default ChatMessage;
