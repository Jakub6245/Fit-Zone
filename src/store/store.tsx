import { configureStore } from "@reduxjs/toolkit";

import { reducer as userReducer } from "@/slices/user";
import { reducer as notificationReducer } from "@/slices/notification";
import { reducer as chatReducer } from "@/slices/chat";
import { firestoreApi } from "@/services/users";
import { notifications } from "@/services/notifications";
import { clientList } from "@/services/clientLists";
import { chats } from "@/services/chats";
import { useSelector } from "react-redux";
import { StateType } from "@/types/StateType";

const store = configureStore({
  reducer: {
    userReducer,
    notificationReducer,
    chatReducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    [notifications.reducerPath]: notifications.reducer,
    [clientList.reducerPath]: clientList.reducer,
    [chats.reducerPath]: chats.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      firestoreApi.middleware,
      notifications.middleware,
      clientList.middleware,
      chats.middleware,
    ]),
});

export const useUser = () =>
  useSelector((state: StateType) => state.userReducer.user);
export const useNotifications = () =>
  useSelector((state: StateType) => state.notificationReducer.notifications);
export const useChatWithUser = () =>
  useSelector((state: StateType) => state.chatReducer.chatWithUser);
export default store;
