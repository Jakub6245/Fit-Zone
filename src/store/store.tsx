import { configureStore } from "@reduxjs/toolkit";

import { reducer as userReducer } from "@/slices/user";
import { reducer as notificationReducer } from "@/slices/notification";
import { reducer as chatReducer } from "@/slices/chat";
import { firestoreApi } from "@/services/users";
import { notifications } from "@/services/notifications";
import { clientList } from "@/services/clientLists";
import { chats } from "@/services/chats";

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

export default store;
