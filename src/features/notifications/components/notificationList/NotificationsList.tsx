import Notification from "../notification/NotificationColaboration";

import { useFetchUsersNotificationsQuery } from "@/features/notifications/services/notifications";
import { NotificationType } from "@/shared/types/NotificationType";
import { useUser } from "@/store/store";
import styles from "./styles.module.scss";

export const NotificationsList = () => {
  const user = useUser();

  const { data } = useFetchUsersNotificationsQuery(user.notificationListId);

  if (!data) return;

  return (
    <div className={styles.notification__list__container}>
      {data.notifications.map((el: NotificationType, i: number) => {
        return <Notification key={i} notificationData={el} />;
      })}
      {data.notifications.length === 0 && (
        <p className={styles.notification__list__message}>
          You do not have any notifications
        </p>
      )}
    </div>
  );
};
