import { useState } from "react";
import NotificationsList from "../../../features/notifications/components/notificationList/NotificationsList";
import ClientList from "../../../features/ClientList/components/chatUsersList/ChatUsersList";
import { Collapse, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import ChatWindow from "@/features/chat/components/ChatWindow/ChatWindow";
import { useChatWithUser } from "@/store/store";

const Navigation = () => {
  const chatUser = useChatWithUser();
  const notifications = useDisclosure();
  const chatUsers = useDisclosure();
  const router = useRouter();
  return (
    <div className={styles.navigation__container}>
      <h1 className={styles.navigation__logo}>Fit-Zone</h1>
      <ul className={styles.navigation__list}>
        <div>
          <button
            className={styles.navigation__button}
            onClick={() => {
              notifications.onToggle();
              if (chatUsers.isOpen) chatUsers.onToggle();
            }}
          >
            Notifications
          </button>
          <Collapse
            in={notifications.isOpen}
            transition={{ exit: { delay: 0.2 }, enter: { duration: 0.5 } }}
          >
            <NotificationsList />
          </Collapse>
        </div>
        <div>
          <button
            className={styles.navigation__button}
            onClick={() => {
              chatUsers.onToggle();
              if (notifications.isOpen) notifications.onToggle();
            }}
          >
            Messages
          </button>
          <Collapse
            in={chatUsers.isOpen}
            transition={{ exit: { delay: 0.2 }, enter: { duration: 0.5 } }}
          >
            <ClientList />
          </Collapse>

          {chatUser.chatWithUser && <ChatWindow />}
        </div>
        <div>
          <button
            className={styles.navigation__button}
            onClick={() => router.push("/diets")}
          >
            Diets
          </button>
        </div>
        <div>
          <button
            className={styles.navigation__button}
            onClick={() => router.push("/search-for-trainer")}
          >
            Search for trainer
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
