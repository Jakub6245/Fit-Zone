import { deleteNotificationFromDB } from "@/services/firebaseNotificationMethods";
import { addUserToClientList } from "@/services/firebaseUserMethods";
import { NotificationType } from "@/types/NotificationType";

const handleDecline = (notificationId: string) => {
  deleteNotificationFromDB(notificationId);
};

const handleAccept = (clientId: string, notificationId: string) => {
  addUserToClientList(clientId)
    .then(() => deleteNotificationFromDB(notificationId))
    .catch((error) => console.log(error));
};

const Notification = ({ data }: { data: NotificationType }) => {
  return (
    <div>
      <p>{data.message}</p>
      <button onClick={() => handleAccept(data.from, data.id)}>accept</button>
      <button onClick={() => handleDecline(data.id)}>decline</button>
    </div>
  );
};

export default Notification;
