import store from "@/store/store";

import { actions as userActions } from "@/shared/slices/user";
import { actions as notificationActions } from "@/features/notifications/slices/notification";
import { actions as chatActions } from "@/features/chat/slices/chat";
import { actions as dietDayActions } from "@/features/diet/slices/dietDay";

export interface ActionsObject {
  [x: string]: (...args: any[]) => any;
}

export const bindActionsToDispatch = <T extends ActionsObject>(
  dispatch: Function,
  actions: T
) => {
  return Object.keys(actions).reduce(
    (boundActions, key) => {
      boundActions[key as keyof T] = (...args: Parameters<T[keyof T]>) => {
        dispatch(actions[key as keyof T](...args));
      };

      return boundActions;
    },
    {} as {
      [K in keyof T]: (...args: Parameters<T[K]>) => void;
    }
  );
};

export const boundUserActions = bindActionsToDispatch(
  store.dispatch,
  userActions
);

export const boundNotificationActions = bindActionsToDispatch(
  store.dispatch,
  notificationActions
);

export const boundChatActions = bindActionsToDispatch(
  store.dispatch,
  chatActions
);

export const boundDietDayActions = bindActionsToDispatch(
  store.dispatch,
  dietDayActions
);
