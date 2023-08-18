import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { boundUserActions } from "@/hooks/useBindActionsToDispatch";
import { getUserFromFirebase } from "./firebaseUserMethods";
import { UserObjectType } from "@/types/UserType";
import { Provider } from "react-redux";
import store from "@/store/store";

export const StateProvider = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = (await getUserFromFirebase(
          user.uid
        )) as UserObjectType;

        boundUserActions.setUser({ user: userData });
      } else {
        boundUserActions.setUser({ user: null });
      }
    });
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
