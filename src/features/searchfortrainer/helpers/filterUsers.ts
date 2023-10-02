import { UserObjectType, UserType } from "@/shared/types/UserType";

export const filterUsers = (users: UserObjectType[], userType: UserType) => {
  return users.filter((user) => user.userType === userType);
};
