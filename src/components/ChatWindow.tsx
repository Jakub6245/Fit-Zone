import { useFetchSingleUserDataQuery } from "@/services/users";
import { ChatType } from "@/types/ChatListTypes";
import ChatMessage from "./ChatMessage";
import { useState } from "react";
import { addMessageToChatInDB } from "@/services/firebaseChatMethods";
import { useSelector } from "react-redux";
import { StateType } from "@/types/StateType";

const ChatWindow = ({ chatData }: { chatData: ChatType }) => {
  const { data, isFetching } = useFetchSingleUserDataQuery(chatData.withWho);
  const [message, setMessage] = useState("");
  const user = useSelector((state: StateType) => state.userReducer.user);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  if (isFetching) {
    return <div>...Loading</div>;
  }

  if (!data) return;

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
      <button
        onClick={() =>
          addMessageToChatInDB(user.id, chatData.withWho, {
            fromWho: user.id,
            content: message,
          })
        }
      >
        Send
      </button>
    </div>
  );
};

export default ChatWindow;
