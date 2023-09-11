import { configureStore } from "@reduxjs/toolkit";

import { reducer as userReducer } from "@/shared/slices/user";
import { reducer as notificationReducer } from "@/features/notifications/slices/notification";
import { reducer as chatReducer } from "@/features/chat/slices/chat";
import { firestoreApi } from "@/services/users";
import { notifications } from "@/features/notifications/services/notifications";
import { clientList } from "@/features/ClientList/services/clientLists";
import { chats } from "@/features/chat/services/chats";
import { useSelector } from "react-redux";
import { StateType } from "@/shared/types/StateType";

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
