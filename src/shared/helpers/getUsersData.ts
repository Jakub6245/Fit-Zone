import { UserObjectType } from "../types/UserType";

export const getUserData = (array: UserObjectType[], id: string) => {
  return array.find((user) => user.id === id);
};
