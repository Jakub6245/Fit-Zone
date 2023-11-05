export type UserObjectType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  notificationListId: string;
  chatUsersListId: string;
  chatList: string[];
  dietObjectId: string;
  dietDayObjectId: string;
  description: string;
  phoneNumber: string;
  savedDietDaysObjectId: string;
  imageId: string;
  imageUrl: string;
  trainingId: string;
  savedTrainingsId: string;
};

export type UserType = "trainer" | "client";
