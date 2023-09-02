import { useFetchSingleUserDataQuery } from "@/services/users";
import { ChatType } from "@/types/ChatListTypes";
import ChatMessage from "./ChatMessage";
import { useState } from "react";

import {
  useAddMessageToChatMutation,
  useFetchUsersChatQuery,
} from "@/services/chats";
import { useChatWithUser, useUser } from "@/store/store";

const ChatWindow = () => {
  const chatWith = useChatWithUser();
  const userData = useFetchSingleUserDataQuery(chatWith);
  const [message, setMessage] = useState("");
  const user = useUser();
  const [addMessageToChat] = useAddMessageToChatMutation();
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const chatData = useFetchUsersChatQuery({
    userId: user.id,
    chatWithUser: chatWith,
  });

  const messageObject = { fromWho: user.id, content: message };

  if (userData.isFetching || chatData.isFetching) {
    return <div>...Loading</div>;
  }

  if (!userData.data || !chatData.data) return;

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
      <div>
        {chatData.data.messages.map((message, i) => {
          return <ChatMessage key={i} message={message} />;
        })}
      </div>
      <input type="text" value={message} onChange={handleInput} />
      <button onClick={handleBtn}>Send</button>
    </div>
  );
};

export default ChatWindow;
