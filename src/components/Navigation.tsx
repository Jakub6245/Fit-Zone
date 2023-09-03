import { useState } from "react";
import NotificationsList from "./NotificationsList";
import { useRouter } from "next/router";

const Navigation = () => {
  const [notificationsShow, setNotificationsShow] = useState(false);
  const router = useRouter();
  return (
    <div>
      <ul>
        <div>
          <li onClick={() => setNotificationsShow(!notificationsShow)}>
            Notifications
          </li>
          {notificationsShow && <NotificationsList />}
        </div>
        <div>
          <li onClick={() => router.push("/messages")}>Messages</li>
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
