import store from "@/store/store";

import { actions as userActions } from "@/slices/user";
import { actions as notificationActions } from "@/slices/notification";
import { actions as chatActions } from "@/slices/chat";

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

// export const boundProductActions = bindActionsToDispatch(store.dispatch, {
//   ...productActions,
//   fetchAllProductsThunk,
// });

// export const boundCartActions = bindActionsToDispatch(
//   store.dispatch,
//   cartActions
// );

// export const boundSearchActions = bindActionsToDispatch(
//   store.dispatch,
//   searchActions
// );

// export const boundLoginActions = bindActionsToDispatch(
//   store.dispatch,
//   loginActions
// );
