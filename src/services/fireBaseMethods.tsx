import { setDoc, doc, DocumentData, onSnapshot } from "firebase/firestore";
import { dbUsersCollection } from "@/config/firebaseConfig";
import { UserType } from "@/types/UserType";
import { useState, useEffect } from "react";

export const useGetUsers = () => {
  const [users, setUsers] = useState<DocumentData>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(dbUsersCollection, (querySnapshot) => {
      const items: DocumentData = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUsers(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);
  return { users, loading };
};

export const addUser = async (data: UserType) => {
  try {
    const userRef = doc(dbUsersCollection, data.id);
    await setDoc(userRef, data);
  } catch (error) {
    console.error(error);
  }
};
