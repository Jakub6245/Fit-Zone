import Notification from "./Notification";

import { useFetchUsersNotificationsQuery } from "@/services/notifications";
import { useUser } from "@/store/store";

const NotificationsList = () => {
  const user = useUser();

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
