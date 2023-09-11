import { useFetchSingleUserDataQuery } from "@/services/users";
import ChatMessage from "./ChatMessage";
import { useState } from "react";

import {
  useAddMessageToChatMutation,
  useFetchUsersChatQuery,
} from "@/features/chat/services/chats";
import { useChatWithUser, useUser } from "@/store/store";
import MessagesList from "./MessagesList";
import { ChatType } from "@/shared/types/ChatListTypes";

const ChatWindow = () => {
  const chatWith = useChatWithUser();
  const userData = useFetchSingleUserDataQuery(chatWith);
  const [message, setMessage] = useState("");
  const user = useUser();
  const [addMessageToChat] = useAddMessageToChatMutation();
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const messageObject = { fromWho: user.id, content: message };

  if (userData.isFetching) {
    return <div>...Loading</div>;
  }

  if (!userData.data) return;

  const handleBtn = () => {
    if (message.length === 0) return;

    addMessageToChat({
      userId: user.id,
      chatWithUser: chatWith,
      message: messageObject,
    });
    setMessage("");
  };

  return (
    <div>
      <h1>
        {userData.data.firstName} {userData.data.lastName}
      </h1>
      <MessagesList userId={user.id} chatWithUser={chatWith} />

      {/* form */}
      <input type="text" value={message} onChange={handleInput} />
      <button onClick={handleBtn}>Send</button>
    </div>
  );
};

export default ChatWindow;
