import { configureStore } from "@reduxjs/toolkit";
import { reducer as dietDayReducer } from "@/features/diet/slices/dietDay";
import { reducer as userReducer } from "@/shared/slices/user";
import { reducer as notificationReducer } from "@/features/notifications/slices/notification";
import { reducer as trainingReducer } from "@/features/trainings/slices/training";
import { reducer as chatReducer } from "@/features/chat/slices/chat";
import { firestoreApi } from "@/shared/services/users";
import { notifications } from "@/features/notifications/services/notifications";
import { chatUsers } from "@/features/chatUsers/services/chatUsers";
import { chats } from "@/features/chat/services/chats";
import { dietObject } from "@/features/diet/services/diets";
import { products } from "@/features/product/services/products";
import { dietDay } from "@/features/dietDuringDay/services/dietDay";
import { exercises } from "@/features/exercises/services/exercises";
import { training } from "@/features/trainings/services/training";
import { useSelector } from "react-redux";
import { StateType } from "@/shared/types/StateType";

const store = configureStore({
  reducer: {
    trainingReducer,
    userReducer,
    dietDayReducer,
    notificationReducer,
    chatReducer,
    [exercises.reducerPath]: exercises.reducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    [notifications.reducerPath]: notifications.reducer,
    [chatUsers.reducerPath]: chatUsers.reducer,
    [chats.reducerPath]: chats.reducer,
    [dietObject.reducerPath]: dietObject.reducer,
    [products.reducerPath]: products.reducer,
    [dietDay.reducerPath]: dietDay.reducer,
    [training.reducerPath]: training.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      firestoreApi.middleware,
      notifications.middleware,
      chatUsers.middleware,
      chats.middleware,
      dietObject.middleware,
      products.middleware,
      dietDay.middleware,
      exercises.middleware,
      training.middleware,
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
export const useTrainingDate = () =>
  useSelector((state: StateType) => state.trainingReducer);
export default store;
