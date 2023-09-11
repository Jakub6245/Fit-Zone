export type UserObjectType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  notificationListId: string;
  clientListId: string;
  chatList: string[];
};

export type UserType = "trainer" | "client";
