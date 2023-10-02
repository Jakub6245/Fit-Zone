import ChatMessage from "../ChatMessage/ChatMessage";
import { useFetchUsersChatQuery } from "@/features/chat/services/chats";
import styles from "./styles.module.scss";

const MessagesList = ({
  userId,
  chatWithUser,
}: {
  userId: string;
  chatWithUser: string;
}) => {
  // Function to scroll the container to the bottom

  const chatData = useFetchUsersChatQuery(
    {
      userId: userId,
      chatWithUser: chatWithUser,
    },
    { pollingInterval: 5000 }
  );

  if (chatData.isLoading)
    return <div style={{ height: "40vh" }}>...Loading</div>;
  if (!chatData.data) return "No data";

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
