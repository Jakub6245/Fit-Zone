import { useState } from "react";
import NotificationsList from "./NotificationsList";
import ClientList from "./ClientList";

const Navigation = () => {
  const [notificationsShow, setNotificationsShow] = useState(false);
  const [clientListShow, setClientListShow] = useState(false);
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
          <li onClick={() => setClientListShow(!clientListShow)}>
            Client list
          </li>
          {clientListShow && <ClientList />}
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
