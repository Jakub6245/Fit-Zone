import { NotificationType } from "./NotificationType";

export type ClientObjectType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isTrainer: boolean;
  notifications: NotificationType[];
  trainerId: string;
};

export type TrainerObjectType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isTrainer: boolean;
  notifications: NotificationType[];
  clientList: string[];
};

export type UserObjectType = ClientObjectType | TrainerObjectType;

export type UserType = "trainer" | "client";
