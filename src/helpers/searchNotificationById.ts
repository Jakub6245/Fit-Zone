import { NotificationType } from "@/types/NotificationType";

export const searchNotificationById = (arr: NotificationType[], id: string) => {
  console.log(arr);
  return arr.findIndex((obj, i) => obj.id === id)!;
};
