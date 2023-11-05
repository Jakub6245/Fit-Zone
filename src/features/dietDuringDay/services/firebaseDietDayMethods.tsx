import {
  dbDietDayCollection,
  dbSavedDietDaysCollection,
} from "@/config/firebaseConfig";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import {
  DietDayProductObjectT,
  DietDayProductT,
  SavedDietDaysObjectType,
  SavedDietDaysType,
} from "../../diet/types/dietObject";

export const addDietDayObjectToDB = () => {
  try {
    const dietDayObjectRef = doc(dbDietDayCollection);
    setDoc(dietDayObjectRef, { dietDay: [] });
    return dietDayObjectRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const addSavedDietDaysObject = () => {
  try {
    const savedDietDaysObjectRef = doc(dbSavedDietDaysCollection);
    setDoc(savedDietDaysObjectRef, { savedDietDays: [] });
    return savedDietDaysObjectRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const saveDietDay = async (
  savedDietDaysId: string,
  newDay: SavedDietDaysType
) => {
  try {
    const savedDietDays = (await getSavedDietDaysObject(
      savedDietDaysId
    )) as SavedDietDaysObjectType;
    savedDietDays.savedDietDays.push(newDay);
    await updateSavedDietDaysObject(savedDietDaysId, savedDietDays);
  } catch (error) {
    console.error(error);
  }
};

export const addProductToDayDiet = async (
  dietDayId: string,
  newProduct: DietDayProductT
) => {
  try {
    const dietDay = (await getDietDayObject(
      dietDayId
    )) as DietDayProductObjectT;
    dietDay.dietDay.push(newProduct);
    await updateUsersDietDayObject(dietDayId, dietDay);
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductFromDayDiet = async (
  dietDayId: string,
  productId: string
) => {
  try {
    const dietDay = (await getDietDayObject(
      dietDayId
    )) as DietDayProductObjectT;
    const productToDeleteIndex = dietDay.dietDay.findIndex(
      (el) => el.id === productId
    );
    if (productToDeleteIndex !== -1) {
      dietDay.dietDay.splice(productToDeleteIndex, 1);
    }

    await updateUsersDietDayObject(dietDayId, dietDay);
  } catch (error) {
    console.error(error);
  }
};

export const updateUsersDietDayObject = async (
  userId: string,
  dietDayObject: DietDayProductObjectT
) => {
  await updateDoc(doc(dbDietDayCollection, userId), {
    ...dietDayObject,
  });
};

export const updateSavedDietDaysObject = async (
  userId: string,
  savedDietDayObject: SavedDietDaysObjectType
) => {
  await updateDoc(doc(dbSavedDietDaysCollection, userId), {
    ...savedDietDayObject,
  });
};

export const getDietDayObject = async (dietObjectId: string) => {
  try {
    const response = await getDoc(doc(dbDietDayCollection, dietObjectId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getSavedDietDay = async (
  savedDietObjectId: string,
  date: string
) => {
  const days = (await getSavedDietDaysObject(
    savedDietObjectId
  )) as SavedDietDaysObjectType;
  if (!days) return;
  const givenDay = days.savedDietDays.find((el) => el.date === date);

  return givenDay;
};

export const getSavedDietDaysObject = async (savedDietObjectId: string) => {
  try {
    // const isInDB = await isdietDayInDB(uid);
    const response = await getDoc(
      doc(dbSavedDietDaysCollection, savedDietObjectId)
    );

    const data = response.data();

    if (!data) return;

    return data;
  } catch (err) {
    console.error(err);
  }
};
