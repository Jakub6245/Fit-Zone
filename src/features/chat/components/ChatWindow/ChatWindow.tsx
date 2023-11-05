import { useFetchSingleUserDataQuery } from "@/shared/services/users";

import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { useAddMessageToChatMutation } from "@/features/chat/services/chats";
import { useChatWithUser, useUser } from "@/store/store";
import MessagesList from "../MessagesList/MessagesList";
import defaultImage from "../../../../../images.png";
import { CloseButton } from "@chakra-ui/react";
import { boundChatActions } from "@/shared/hooks/useBindActionsToDispatch";
import Image from "next/image";

export const ChatWindow = () => {
  const chatWith = useChatWithUser();
  const userData = useFetchSingleUserDataQuery(chatWith.chatWithUser);
  const [message, setMessage] = useState("");
  const user = useUser();
  const [addMessageToChat] = useAddMessageToChatMutation();
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const messageObject = { fromWho: user.id, content: message };

  if (!userData.data) return;

  const handleCloseChat = () => {
    boundChatActions.setChatWithUserToChat({ chatWithUser: null });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.length === 0) return;

    addMessageToChat({
      userId: user.id,
      chatWithUser: chatWith.chatWithUser,
      message: messageObject,
    });
    setMessage("");
  };

  return (
    <div className={styles.chat__window__container}>
      <div className={styles.chat__window__user__name}>
        <div className={styles.chat__window__user__info}>
          <div className={styles.chat__window__image__container}>
            <Image
              className={styles.chat__window__image}
              src={
                userData.data.imageUrl ? userData.data.imageUrl : defaultImage
              }
              width={50}
              height={50}
              alt="profile image"
            />
          </div>
          <h1>
            {userData.data.firstName} {userData.data.lastName}
          </h1>
        </div>
        <CloseButton size="lg" onClick={handleCloseChat} />
      </div>

      <MessagesList userId={user.id} chatWithUser={chatWith.chatWithUser} />

      <form onSubmit={handleSubmit}>
        <div className={styles.chat__window__input__container}>
          <input
            className={styles.chat__window__input}
            type="text"
            value={message}
            onChange={handleInput}
          />
          <button className={styles.chat__window__button} type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
