import { NotificationType } from "@/shared/types/NotificationType";

import { createToastNotification } from "@/shared/helpers/createToastNotification";
import { useDeleteNotificationFromListMutation } from "@/features/notifications/services/notifications";
import { useAddUserToChatUsersListMutation } from "@/features/chatUsers/services/chatUsers";
import { handlePromise } from "@/shared/helpers/handlePromise";
import { addChatObjectToDB } from "@/features/chat/services/firebaseChatMethods";
import { useUser } from "@/store/store";
import { addChatIdToUserChatList } from "@/shared/services/firebaseUserMethods";
import styles from "./styles.module.scss";
import { useFetchSingleUserDataQuery } from "@/shared/services/users";

const NotificationColaboration = ({
  notificationData,
}: {
  notificationData: NotificationType;
}) => {
  const user = useUser();
  const [deleteNotificationFromList] = useDeleteNotificationFromListMutation();
  const [addChatUserToListToDB] = useAddUserToChatUsersListMutation();
  const { data } = useFetchSingleUserDataQuery(notificationData.from);
  const onSuccessDecline = () => {
    deleteNotificationFromList({
      userId: user.notificationListId,
      notificationId: notificationData.id,
    });
    createToastNotification("You declined colaboration");
  };

  const onSuccessAccept = () => {
    if (!data) return;
    addChatUserToListToDB({
      chatUsersId: user.chatUsersListId,
      userId: notificationData.from,
    });
    addChatUserToListToDB({
      chatUsersId: data.chatUsersListId,
      userId: user.id,
    });

    const chatId = addChatObjectToDB(user.id, notificationData.from);
    if (!chatId) return;
    addChatIdToUserChatList(user.id, chatId);
    addChatIdToUserChatList(notificationData.from, chatId);
    deleteNotificationFromList({
      userId: user.notificationListId,
      notificationId: data.id,
    });
    createToastNotification("You accepted colaboration");
  };

  const onError = () => {
    createToastNotification("Something went wrong");
  };

  return (
    <div className={styles.notification__container}>
      <p className={styles.notification__text}>{notificationData.message}</p>
      <button
        className={
          styles.notification__button +
          " " +
          styles.notification__button__accept
        }
        onClick={() => handlePromise(onSuccessAccept, onError)}
      >
        accept
      </button>
      <button
        className={
          styles.notification__button +
          " " +
          styles.notification__button__decline
        }
        onClick={() => handlePromise(onSuccessDecline, onError)}
      >
        decline
      </button>
    </div>
  );
};

export default NotificationColaboration;
