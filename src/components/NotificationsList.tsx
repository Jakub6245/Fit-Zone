import { auth } from "@/config/firebaseConfig";
import { getUserFromFirebase } from "@/services/firebaseUserMethods";
import { NotificationType } from "@/types/NotificationType";
import { UserObjectType } from "@/types/UserType";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import Notification from "./Notification";

const NotificationsList = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    (async () => {
      if (auth.currentUser) {
        const user = (await getUserFromFirebase(
          auth.currentUser.uid
        )) as UserObjectType;
        console.log(user);
        await setNotifications(user.notifications);
      }
    })();
  }, []);

  return (
    <div>
      {notifications.map((el, i) => {
        return <Notification key={i} data={el} />;
      })}
    </div>
  );
};

export default NotificationsList;
