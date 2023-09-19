import { dbDietCollection, dbDietDayCollection } from "@/config/firebaseConfig";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { DietObjectT } from "@/features/diet/types/dietObject";
import {
  DietDayProductObjectT,
  DietDayProductT,
} from "@/features/product/types/productObject";

export const addDietDayObjectToDB = () => {
  try {
    const dietDayObjectRef = doc(dbDietDayCollection);
    setDoc(dietDayObjectRef, { dietDay: [] });
    return dietDayObjectRef.id;
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
    console.log(dietDay);
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
    if (productToDeleteIndex) {
      dietDay.dietDay.splice(productToDeleteIndex, 1);
    }

    console.log(dietDay);
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

export const getDietDayObject = async (dietObjectId: string) => {
  try {
    // const isInDB = await isdietDayInDB(uid);
    const response = await getDoc(doc(dbDietDayCollection, dietObjectId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};
