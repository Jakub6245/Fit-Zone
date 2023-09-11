import { UserObjectType } from "@/shared/types/UserType";

export const getUserData = (array: UserObjectType[], id: string) => {
  return array.find((user) => user.id === id);
};
