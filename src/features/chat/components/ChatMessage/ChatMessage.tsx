import { MessageType } from "@/shared/types/MessageType";
import styles from "./styles.module.scss";
import { useUser } from "@/store/store";
export const ChatMessage = ({ message }: { message: MessageType }) => {
  const user = useUser();

  const containerClass =
    message.fromWho === user.id
      ? styles.chat__message__send
      : styles.chat__message__achieved;

  return (
    <div className={styles.chat__message__container + " " + containerClass}>
      {message.content}
    </div>
  );
};

export default ChatMessage;
