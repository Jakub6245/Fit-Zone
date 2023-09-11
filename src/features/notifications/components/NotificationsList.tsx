import Notification from "./Notification";

import { useFetchUsersNotificationsQuery } from "@/features/notifications/services/notifications";
import { NotificationType } from "@/shared/types/NotificationType";
import { useUser } from "@/store/store";

const NotificationsList = () => {
  const user = useUser();
  console.log(user);
  const { data, isFetching } = useFetchUsersNotificationsQuery(
    user.notificationListId
  );

  if (isFetching) {
    return <div>...Loading</div>;
  }

  if (!data) return;

  return (
    <div>
      {data.notifications.map((el: NotificationType, i: number) => {
        return <Notification key={i} data={el} />;
      })}
      {data.notifications.length === 0 && (
        <div>You do not have any notifications</div>
      )}
    </div>
  );
};

export default NotificationsList;
