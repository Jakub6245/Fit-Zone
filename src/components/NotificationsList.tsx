import { auth } from "@/config/firebaseConfig";
import { getUserFromFirebase } from "@/services/firebaseUserMethods";
import { NotificationType } from "@/types/NotificationType";
import { UserObjectType } from "@/types/UserType";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { StateType } from "@/types/StateType";
import { useFetchUsersNotificationsQuery } from "@/services/notifications";
import { boundNotificationActions } from "@/hooks/useBindActionsToDispatch";

const NotificationsList = () => {
  const user = useSelector((state: StateType) => state.userReducer.user);
  const notifications = useSelector(
    (state: StateType) => state.notificationReducer.notifications
  );
  const { data, isFetching } = useFetchUsersNotificationsQuery(user.id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      console.log(data.notifications);
      boundNotificationActions.setNotifications({
        notifications: data.notifications,
      });
    }
  }, [data]);

  if (isFetching) {
    return <div>...Loading</div>;
  }
  console.log(notifications, data?.notifications);

  // useEffect(() => {
  //   (async () => {
  //     if (auth.currentUser) {
  //       const user = (await getUserFromFirebase(
  //         auth.currentUser.uid
  //       )) as UserObjectType;
  //       console.log(user);
  //       await setNotifications(user.notifications);
  //     }
  //   })();
  // }, []);

  return (
    <div>
      {notifications.map((el, i) => {
        return <Notification key={i} data={el} />;
      })}
      {notifications.length === 0 && (
        <div>You do not have any notifications</div>
      )}
    </div>
  );
};

export default NotificationsList;
