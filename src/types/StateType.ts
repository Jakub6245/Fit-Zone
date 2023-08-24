import { ChatType } from "./ChatListTypes";
import { NotificationType } from "./NotificationType";
import { UserObjectType } from "./UserType";

export type StateType = {
  userReducer: { user: UserObjectType };
  notificationReducer: { notifications: NotificationType[] };
  chatReducer: { client: string };
};
