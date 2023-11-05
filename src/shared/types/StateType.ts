import { NotificationType } from "./NotificationType";
import { UserObjectType } from "./UserType";

export type StateType = {
  userReducer: { user: UserObjectType };
  notificationReducer: { notifications: NotificationType[] };
  chatReducer: { chatWithUser: string; isOpen: boolean };
  dietDayReducer: { date: string };
  trainingReducer: { date: string; id: string };
};
