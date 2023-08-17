import { configureStore } from "@reduxjs/toolkit";

import { reducer as userReducer } from "@/slices/user";
import { reducer as notificationReducer } from "@/slices/notification";
import { firestoreApi } from "@/services/users";
import { notifications } from "@/services/notifications";

const store = configureStore({
  reducer: {
    userReducer,
    notificationReducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    [notifications.reducerPath]: notifications.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      firestoreApi.middleware,
      notifications.middleware,
    ]),
});

export default store;
