import { UserObjectType } from "@/shared/types/UserType";
import { uuid } from "uuidv4";

export const createNotificationObject = (user: UserObjectType) => {
  return {
    id: uuid(),
    from: user.id,
    message: `the user ${user.firstName} ${user.lastName} wants to work with you`,
  };
};
