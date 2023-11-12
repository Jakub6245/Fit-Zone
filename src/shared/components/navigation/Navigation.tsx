import { NotificationsList } from "@/features/notifications";
import { ChatUserList } from "@/features/chatUsers";
import { Collapse, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { ChatWindow } from "@/features/chat";
import { useChatWithUser, useUser } from "@/store/store";

import { exitTransition } from "@/lib/chakra-ui/transitions";

const NavigationTitle = "Fit-Zone";

const Navigation = () => {
  const user = useUser();
  const chatUser = useChatWithUser();
  const notifications = useDisclosure();
  const chatUsers = useDisclosure();
  const router = useRouter();

  const toggleNotifications = () => {
    notifications.onToggle();
    if (chatUsers.isOpen) chatUsers.onToggle();
  };

  if (!user) return;

  return (
    <div className={styles.navigation__container}>
      <h1 className={styles.navigation__logo}>{NavigationTitle}</h1>
      <ul className={styles.navigation__list}>
        <div>
          <button
            className={styles.navigation__button}
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </button>
        </div>
        <div>
          <button
            className={styles.navigation__button}
            onClick={toggleNotifications}
          >
            Notifications
          </button>
          <Collapse in={notifications.isOpen} transition={exitTransition}>
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
          <Collapse in={chatUsers.isOpen} transition={exitTransition}>
            <ChatUserList />
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
            onClick={() => router.push("/training")}
          >
            Trainings
          </button>
        </div>
        {user.userType === "client" && (
          <div>
            <button
              className={styles.navigation__button}
              onClick={() => router.push("/search-for-trainer")}
            >
              Search for trainer
            </button>
          </div>
        )}
        <div>
          <button
            className={styles.navigation__button}
            onClick={() => router.push("/profile")}
          >
            Profile
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
