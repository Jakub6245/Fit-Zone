import { UserObjectType } from "@/shared/types/UserType";

export const searchForUsersById = (
  usersArray: UserObjectType[],
  clientsArray: string[]
) => {
  return usersArray.filter((user) => clientsArray.includes(user.id));
};
