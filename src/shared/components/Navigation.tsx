import { useState } from "react";
import NotificationsList from "../../features/notifications/components/NotificationsList";
import ClientList from "../../features/ClientList/components/ClientList";
import { Button } from "@chakra-ui/react";

const Navigation = () => {
  const [notificationsShow, setNotificationsShow] = useState(false);
  const [clientListShow, setClientListShow] = useState(false);
  return (
    <div>
      <ul>
        <div>
          <Button
            colorScheme="green"
            size="lg"
            onClick={() => setNotificationsShow(!notificationsShow)}
          >
            Notifications
          </Button>
          {notificationsShow && <NotificationsList />}
        </div>
        <div>
          <Button
            colorScheme="green"
            size="lg"
            onClick={() => setClientListShow(!clientListShow)}
          >
            Messages
          </Button>
          {clientListShow && <ClientList />}
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
