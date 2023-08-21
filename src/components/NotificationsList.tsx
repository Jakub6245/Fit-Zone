import { useSelector } from "react-redux";
import Notification from "./Notification";
import { StateType } from "@/types/StateType";
import { useFetchUsersNotificationsQuery } from "@/services/notifications";

const NotificationsList = () => {
  const user = useSelector((state: StateType) => state.userReducer.user);

  const { data, isFetching } = useFetchUsersNotificationsQuery(user.id);

  if (isFetching) {
    return <div>...Loading</div>;
  }

  if (!data) return;

  return (
    <div>
      {data.notifications.map((el, i) => {
        return <Notification key={i} data={el} />;
      })}
      {data.notifications.length === 0 && (
        <div>You do not have any notifications</div>
      )}
    </div>
  );
};

export default NotificationsList;
