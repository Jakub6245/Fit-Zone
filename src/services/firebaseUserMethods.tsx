import { setDoc, doc, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { dbUsersCollection, db } from "@/config/firebaseConfig";
import { UserType, UserObjectType } from "@/types/UserType";

export const getAllUsers = async () => {
  try {
    const response = await getDocs(dbUsersCollection);

    const users = response.docs.map((data) => data.data());

    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getGivenUsers = async (userType: UserType) => {
  try {
    const response = await getAllUsers();

    if (userType === "client") {
      return response.filter((user) => !user.isTrainer);
    }

    return response.filter((user) => user.isTrainer);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const updateUser = async (uid: string, userData: UserObjectType) => {
  await updateDoc(doc(db, "users", uid), { ...userData });
};

export const addUser = async (data: UserObjectType) => {
  try {
    const userRef = doc(dbUsersCollection, data.id);
    await setDoc(userRef, data);
  } catch (error) {
    console.error(error);
  }
};

export const getUserFromFirebase = async (uid: string) => {
  try {
    // const isInDB = await isUserInDB(uid);
    const response = await getDoc(doc(db, "users", uid));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};
