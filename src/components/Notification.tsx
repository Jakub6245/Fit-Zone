import { NotificationType } from "@/types/NotificationType";

import { createToastNotification } from "@/helpers/createToastNotification";
import { useDeleteNotificationFromListMutation } from "@/services/notifications";
import { useAddClientToClientListMutation } from "@/services/clientLists";
import { handlePromise } from "@/helpers/handlePromise";
import { addChatObjectToDB } from "@/services/firebaseChatMethods";
import { useUser } from "@/store/store";
import {
  addChatIdToUserChatList,
  getUserFromFirebase,
} from "@/services/firebaseUserMethods";

const Notification = ({ data }: { data: NotificationType }) => {
  const user = useUser();
  const [deleteNotificationFromList] = useDeleteNotificationFromListMutation();
  const [addClientToClientList] = useAddClientToClientListMutation();
  const onSuccessDecline = () => {
    deleteNotificationFromList({
      userId: user.notificationListId,
      notificationId: data.id,
    });
    createToastNotification("You declined colaboration");
  };

  const onSuccessAccept = async () => {
    const chatWithUser = await getUserFromFirebase(data.from);
    if (!chatWithUser) return;
    addClientToClientList({
      clientListId: user.clientListId,
      clientId: data.from,
    });
    addClientToClientList({
      clientListId: chatWithUser.clientListId,
      clientId: user.id,
    });

    const chatId = addChatObjectToDB(user.id, data.from);
    if (!chatId) return;
    addChatIdToUserChatList(user.id, chatId);
    addChatIdToUserChatList(data.from, chatId);
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
    <div>
      <p>{data.message}</p>
      <button onClick={() => handlePromise(onSuccessAccept, onError)}>
        accept
      </button>
      <button onClick={() => handlePromise(onSuccessDecline, onError)}>
        decline
      </button>
    </div>
  );
};

export default Notification;
