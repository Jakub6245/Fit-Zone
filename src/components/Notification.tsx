import { boundNotificationActions } from "@/hooks/useBindActionsToDispatch";
import { deleteNotificationFromListFromDB } from "@/services/firebaseNotificationMethods";
import { addClientToListToDB } from "@/services/firebaseClientListMethods";
import { NotificationType } from "@/types/NotificationType";
import { StateType } from "@/types/StateType";
import { useSelector } from "react-redux";
import { createToastNotification } from "@/helpers/createToastNotification";
import { useDeleteNotificationFromListMutation } from "@/services/notifications";
import { useAddClientToClientListMutation } from "@/services/clientLists";

const handleDecline = (onSuccess: () => void, onError: () => void) => {
  try {
    onSuccess();
  } catch (error) {
    console.log(error);
    onError();
  }
};

const handleAccept = (onSuccess: () => void, onError: () => void) => {
  try {
    onSuccess();
  } catch (error) {
    console.log(error);
    onError();
  }
};

const Notification = ({ data }: { data: NotificationType }) => {
  const user = useSelector((state: StateType) => state.userReducer.user);
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
      <button onClick={() => handleAccept(onSuccessAccept, onError)}>
        accept
      </button>
      <button onClick={() => handleDecline(onSuccessDecline, onError)}>
        decline
      </button>
    </div>
  );
};

export default Notification;
