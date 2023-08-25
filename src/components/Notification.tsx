import { NotificationType } from "@/types/NotificationType";

import { createToastNotification } from "@/helpers/createToastNotification";
import { useDeleteNotificationFromListMutation } from "@/services/notifications";
import { useAddClientToClientListMutation } from "@/services/clientLists";
import { handlePromise } from "@/helpers/handlePromise";
import { addChatObjectToDB } from "@/services/firebaseChatMethods";
import { useUser } from "@/store/store";

const Notification = ({ data }: { data: NotificationType }) => {
  const user = useUser();
  const [deleteNotificationFromList] = useDeleteNotificationFromListMutation();
  const [addClientToClientList] = useAddClientToClientListMutation();
  const onSuccessDecline = () => {
    deleteNotificationFromList({
      userId: user.id,
      notificationId: data.id,
    });
    createToastNotification("You declined colaboration");
  };

  const onSuccessAccept = () => {
    addClientToClientList({ userId: user.id, clientId: data.from });
    addClientToClientList({ userId: data.from, clientId: user.id });
    addChatObjectToDB(user.id, data.from);
    deleteNotificationFromList({
      userId: user.id,
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
