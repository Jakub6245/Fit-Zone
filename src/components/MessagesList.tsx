import { MessageType } from "@/types/MessageType";
import ChatMessage from "./ChatMessage";
import { useFetchUsersChatQuery } from "@/services/chats";

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
    { pollingInterval: 5000 }
  );

  if (chatData.isFetching) return <div>...Loading</div>;
  if (!chatData.data) return;

  return (
    <div>
      {chatData.data.messages.map((message, i) => {
        return <ChatMessage key={i} message={message} />;
      })}
    </div>
  );
};

export default MessagesList;
