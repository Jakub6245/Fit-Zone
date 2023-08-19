import { boundNotificationActions } from "@/hooks/useBindActionsToDispatch";
import { deleteNotificationFromListFromDB } from "@/services/firebaseNotificationMethods";
import { addClientToListToDB } from "@/services/firebaseClientListMethods";
import { NotificationType } from "@/types/NotificationType";
import { StateType } from "@/types/StateType";
import { useSelector } from "react-redux";
import { createToastNotification } from "@/helpers/createToastNotification";

const handleDecline = (userId: string, notificationId: string) => {
  deleteNotificationFromListFromDB(userId, notificationId);
  boundNotificationActions.deleteNotification({
    notificationId: notificationId,
  });
  createToastNotification("You declined colaboration");
};

const handleAccept = (
  userId: string,
  clientId: string,
  notificationId: string
) => {
  addClientToListToDB(userId, clientId);
  boundNotificationActions.deleteNotification({
    notificationId: notificationId,
  });
  createToastNotification("You accepted colaboration");
};

const Notification = ({ data }: { data: NotificationType }) => {
  const user = useSelector((state: StateType) => state.userReducer.user);
  return (
    <div>
      <p>{data.message}</p>
      <button onClick={() => handleAccept(user.id, data.from, data.id)}>
        accept
      </button>
      <button onClick={() => handleDecline(user.id, data.id)}>decline</button>
    </div>
  );
};

export default Notification;
