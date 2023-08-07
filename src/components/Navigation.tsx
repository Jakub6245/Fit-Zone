import { useState } from "react";
import NotificationsList from "./NotificationsList";

const Navigation = () => {
  const [notificationsShow, setNotificationsShow] = useState(false);
  return (
    <div>
      <ul>
        <div>
          <li onClick={() => setNotificationsShow(!notificationsShow)}>
            Notifications
          </li>
          {notificationsShow && <NotificationsList />}
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
