import { useFetchSingleUserDataQuery } from "@/services/users";
import { ChatType } from "@/types/ChatListTypes";
import ChatMessage from "./ChatMessage";
import { useState } from "react";

import { useAddMessageToChatMutation } from "@/services/chats";
import { useChatWithUser, useUser } from "@/store/store";

const ChatWindow = ({ chatData }: { chatData: ChatType }) => {
  const chatWith = useChatWithUser();
  const { data, isFetching } = useFetchSingleUserDataQuery(chatWith);
  const [message, setMessage] = useState("");
  const user = useUser();
  const [addMessageToChat] = useAddMessageToChatMutation();
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const messageObject = { fromWho: user.id, content: message };

  if (isFetching) {
    return <div>...Loading</div>;
  }

  if (!data) return;

  const handleBtn = () => {
    if (message.length === 0) return;
    if (user.userType === "trainer") {
      addMessageToChat({
        userId: user.id,
        chatWithUser: chatWith,
        message: messageObject,
      });
    }
    addMessageToChat({
      userId: chatWith,
      chatWithUser: user.id,
      message: messageObject,
    });
  };

  return (
    <div>
      <h1>
        {data.firstName} {data.lastName}
      </h1>
      <div>
        {chatData.messages.map((message, i) => {
          return <ChatMessage key={i} message={message} />;
        })}
      </div>
      <input type="text" value={message} onChange={handleInput} />
      <button onClick={handleBtn}>Send</button>
    </div>
  );
};

export default ChatWindow;
