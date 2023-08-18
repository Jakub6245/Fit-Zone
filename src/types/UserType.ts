export type UserObjectType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
};

export type UserType = "trainer" | "client";
