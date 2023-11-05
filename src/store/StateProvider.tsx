import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { boundUserActions } from "@/shared/hooks/useBindActionsToDispatch";
import { getUserFromFirebase } from "../shared/services/firebaseUserMethods";
import { UserObjectType } from "@/shared/types/UserType";
import { Provider } from "react-redux";
import store from "@/store/store";
import { createToastNotification } from "@/shared/helpers/createToastNotification";

export const StateProvider = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          console.log(user);
          const userData = (await getUserFromFirebase(
            user.uid
          )) as UserObjectType;

          boundUserActions.setUser({ user: userData });
        }
      } catch (error) {
        createToastNotification("Email is already in use");
      }
    });
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
