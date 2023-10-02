import { configureStore } from "@reduxjs/toolkit";
import { reducer as dietDayReducer } from "@/features/diet/slices/dietDay";
import { reducer as userReducer } from "@/shared/slices/user";
import { reducer as notificationReducer } from "@/features/notifications/slices/notification";
import { reducer as chatReducer } from "@/features/chat/slices/chat";
import { firestoreApi } from "@/services/users";
import { notifications } from "@/features/notifications/services/notifications";
import { clientList } from "@/features/ClientList/services/clientLists";
import { chats } from "@/features/chat/services/chats";
import { dietObject } from "@/features/diet/services/diets";
import { products } from "@/features/product/services/products";
import { dietDay } from "@/features/dietDuringDay/services/dietDay";
import { useSelector } from "react-redux";
import { StateType } from "@/shared/types/StateType";

const store = configureStore({
  reducer: {
    userReducer,
    dietDayReducer,
    notificationReducer,
    chatReducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    [notifications.reducerPath]: notifications.reducer,
    [clientList.reducerPath]: clientList.reducer,
    [chats.reducerPath]: chats.reducer,
    [dietObject.reducerPath]: dietObject.reducer,
    [products.reducerPath]: products.reducer,
    [dietDay.reducerPath]: dietDay.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      firestoreApi.middleware,
      notifications.middleware,
      clientList.middleware,
      chats.middleware,
      dietObject.middleware,
      products.middleware,
      dietDay.middleware,
    ]),
});

export const useUser = () =>
  useSelector((state: StateType) => state.userReducer.user);
export const useNotifications = () =>
  useSelector((state: StateType) => state.notificationReducer.notifications);
export const useChatWithUser = () =>
  useSelector((state: StateType) => state.chatReducer);
export const useDietDayDate = () =>
  useSelector((state: StateType) => state.dietDayReducer.date);
export default store;
