import { boundChatActions } from "@/shared/hooks/useBindActionsToDispatch";
import styles from "./styles.module.scss";
import { UserObjectType } from "@/shared/types/UserType";
import Image from "next/image";
import defaultImage from "../../../../../images.png";

const ChatUser = ({ chatUserData }: { chatUserData: UserObjectType }) => {
  return (
    <div
      className={styles.chat__user__container}
      onClick={() => {
        boundChatActions.setChatWithUserToChat({
          chatWithUser: chatUserData.id,
        });
      }}
    >
      <div className={styles.chat__user__image__container}>
        <Image
          className={styles.chat__user__image}
          src={chatUserData.imageUrl ? chatUserData.imageUrl : defaultImage}
          width={50}
          height={50}
          alt="profile image"
        />
      </div>
      <p>
        {chatUserData.firstName} {chatUserData.lastName}
      </p>
    </div>
  );
};

export default ChatUser;
