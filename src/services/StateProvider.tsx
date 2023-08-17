import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import {
  boundNotificationActions,
  boundUserActions,
} from "@/hooks/useBindActionsToDispatch";
import { getUserFromFirebase } from "./firebaseUserMethods";
import { UserObjectType } from "@/types/UserType";
import { Provider } from "react-redux";
import store from "@/store/store";
import { getNotificationList } from "./firebaseNotificationMethods";
import { NotificationType } from "@/types/NotificationType";

// app/trainings/123123123

const useNotifications = () => {
  // useEffect...
  // if notifications.length > 0
  // show notifications
};

export const StateProvider = ({ children }: { children: JSX.Element }) => {
  useNotifications();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = (await getUserFromFirebase(
          user.uid
        )) as UserObjectType;
        const userNotifications = (await getNotificationList(
          user.uid
        )) as NotificationType[];
        boundUserActions.setUser({ user: userData });
        boundNotificationActions.setNotifications({
          notifications: userNotifications,
        });
      } else {
        // logout
      }
    });
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
