import { UserDataT } from "../types/userDataObject";

export const calcCalories = (userData: UserDataT, sex: string) => {
  console.log(userData, sex);
  if (sex === "male") {
    return (
      (10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5) *
      userData.physicalActivity
    );
  }
  if (sex === "female") {
    return (
      (10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161) *
      userData.physicalActivity
    );
  }
  return 0;
};

export const calcFats = (calories: number) => {
  return Math.floor((calories * 0.25) / 9);
};

export const calcCarbohydrates = (
  calories: number,
  protein: number,
  fats: number
) => {
  return Math.floor((calories - protein * 4 - fats * 9) / 4);
};
