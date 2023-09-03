import {
  setDoc,
  doc,
  getDocs,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { dbUsersCollection, db } from "@/config/firebaseConfig";
import { UserType, UserObjectType } from "@/types/UserType";
import { uuid } from "uuidv4";

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

// export const getGivenUsers = async (userType: UserType) => {
//   try {
//     const response = await getAllUsers();

//     if (userType === "client") {
//       return response.filter((user) => !user.isTrainer);
//     }

//     return response.filter((user) => user.isTrainer);
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };

export const updateUser = async (uid: string, userData: UserObjectType) => {
  await updateDoc(doc(db, "users", uid), { ...userData });
};

export const addUser = async (data: UserObjectType) => {
  try {
    const userRef = doc(dbUsersCollection);
    await setDoc(userRef, data);
  } catch (error) {
    console.error(error);
  }
};

export const addChatIdToUserChatList = async (
  userId: string,
  chatId: string
) => {
  try {
    const userDoc = (await getUserFromFirebase(userId)) as UserObjectType;
    const userObjectId = await getUserIdFromFirebase(userId);
    if (!userDoc || !userObjectId) return;
    console.log(userDoc);
    await updateUser(userObjectId, {
      ...userDoc,
      chatList: [...userDoc.chatList, chatId],
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUserIdFromFirebase = async (uid: string) => {
  try {
    const q = query(dbUsersCollection, where("id", "==", uid));
    const querySnapshot = await getDocs(q);
    let userObjectId = "";
    querySnapshot.forEach((doc) => {
      userObjectId = doc.id;
    });

    return userObjectId;
  } catch (err) {
    console.error(err);
  }
};

export const getUserFromFirebase = async (uid: string) => {
  try {
    const userObjectId = await getUserIdFromFirebase(uid);

    const userObject = await getDoc(doc(dbUsersCollection, userObjectId));

    const userData = userObject.data();
    
    return userData;
  } catch (err) {
    console.error(err);
  }
};


