import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKPZP40Gho9TjlW6-2A_r0gKwFPsbEUI8",
  authDomain: "fit-zone-94c86.firebaseapp.com",
  projectId: "fit-zone-94c86",
  storageBucket: "fit-zone-94c86.appspot.com",
  messagingSenderId: "1040538391590",
  appId: "1:1040538391590:web:760fa5b738c772a30f82e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const dbUsersCollection = collection(db, "users");
export const dbNotificationCollection = collection(db, "notification");
export const dbTrainerCollection = collection(db, "trainer");
export const dbClientListCollection = collection(db, "clientList");
export const dbChatCollection = collection(db, "chat");
export const dbDietCollection = collection(db, "diet");
export const dbProductsCollection = collection(db, "products");
export const dbDietDayCollection = collection(db, "dietDay");
