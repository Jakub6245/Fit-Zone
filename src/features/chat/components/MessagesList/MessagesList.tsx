import ChatMessage from "../ChatMessage/ChatMessage";
import { useFetchUsersChatQuery } from "@/features/chat/services/chats";
import styles from "./styles.module.scss";
import { pollingIntervalTime } from "../../config/pollingIntervalTime";

const MessagesList = ({
  userId,
  chatWithUser,
}: {
  userId: string;
  chatWithUser: string;
}) => {
  const chatData = useFetchUsersChatQuery(
    {
      userId: userId,
      chatWithUser: chatWithUser,
    },
    { pollingInterval: pollingIntervalTime }
  );

  if (!chatData.data) return;

  const reversedArray = [...chatData.data.messages].reverse();

  return (
    <div className={styles.messages__list__container}>
      {reversedArray.map((message, i) => {
        return <ChatMessage key={i} message={message} />;
      })}
    </div>
  );
};

export default MessagesList;
