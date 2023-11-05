import { dbDietCollection } from "@/config/firebaseConfig";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { DietObjectT } from "../types/dietObject";

export const addDietObjectToDB = (dietObject: DietObjectT) => {
  try {
    const dietObjectRef = doc(dbDietCollection);
    setDoc(dietObjectRef, dietObject);
    return dietObjectRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const updateUsersDietObject = async (
  userId: string,
  dietObject: DietObjectT
) => {
  await updateDoc(doc(dbDietCollection, userId), {
    ...dietObject,
  });
};

export const getDietObject = async (dietObjectId: string) => {
  try {
    const response = await getDoc(doc(dbDietCollection, dietObjectId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};
