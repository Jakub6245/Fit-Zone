import Notification from "../notification/Notification";

import { useFetchUsersNotificationsQuery } from "@/features/notifications/services/notifications";
import { NotificationType } from "@/shared/types/NotificationType";
import { useUser } from "@/store/store";
import styles from "./styles.module.scss";

const NotificationsList = () => {
  const user = useUser();

  console.log(user);
  const { data } = useFetchUsersNotificationsQuery(user.notificationListId);

  if (!data) return;

  return (
    <div className={styles.notification__list__container}>
      {data.notifications.map((el: NotificationType, i: number) => {
        return <Notification key={i} data={el} />;
      })}
      {data.notifications.length === 0 && (
        <p className={styles.notification__list__message}>
          You do not have any notifications
        </p>
      )}
    </div>
  );
};

export default NotificationsList;
