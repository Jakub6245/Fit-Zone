import { useFetchChatUsersListQuery } from "../../services/chatUsers";
import ChatUser from "../chatUser/ChatUser";
import { useFetchUsersDataQuery } from "@/shared/services/users";
import { searchForUsersById } from "@/shared/helpers/searchForUsers";
import { useUser } from "@/store/store";

import styles from "./styles.module.scss";

export const ChatUserList = () => {
  const user = useUser();

  const chatUsersId = useFetchChatUsersListQuery(user.chatUsersListId);
  const users = useFetchUsersDataQuery();

  if (!users.data || !chatUsersId.data) return;

  const chatUsers = searchForUsersById(
    users.data,
    chatUsersId.data.chatUsersList
  );
  return (
    <div>
      <div className={styles.chat__users__list__container}>
        {chatUsers.map((el, i) => {
          return (
            <div
              className={styles.chat__users__list__chat__user__container}
              key={i}
            >
              <ChatUser chatUserData={el} />
            </div>
          );
        })}
        {chatUsers.length === 0 && (
          <p className={styles.chat__users__list__message}>
            Add your first chat user
          </p>
        )}
      </div>
    </div>
  );
};
