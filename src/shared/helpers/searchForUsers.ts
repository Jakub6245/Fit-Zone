import { UserObjectType } from "@/shared/types/UserType";

export const searchForUsersById = (
  usersArray: UserObjectType[],
  chatUsersArray: string[]
) => {
  return usersArray.filter((user) => chatUsersArray.includes(user.id));
};
