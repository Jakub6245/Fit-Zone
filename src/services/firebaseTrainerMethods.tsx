import { db, dbTrainerCollection } from "@/config/firebaseConfig";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

export const addUsersTrainerToDB = async (userId: string) => {
  try {
    const clientListRef = doc(dbTrainerCollection, userId);
    await setDoc(clientListRef, { trainer: "" });
  } catch (error) {
    console.error(error);
  }
};

export const updateUsersTrainer = async (userId: string, trainerId: string) => {
  await updateDoc(doc(db, "trainer", userId), {
    trainer: trainerId,
  });
};

export const getTrainer = async (userId: string) => {
  try {
    // const isInDB = await isUserInDB(uid);
    const response = await getDoc(doc(db, "trainer", userId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};
