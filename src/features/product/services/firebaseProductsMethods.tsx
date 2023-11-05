import { productListId } from "../config/productListId";
import { DietObjectT } from "../../diet/types/dietObject";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { dbProductsCollection } from "@/config/firebaseConfig";
import { ProductObjectT, ProductT } from "../types/productObject";

export const addProductToListToDB = async (newProduct: ProductT) => {
  try {
    const productList = (await getProductList()) as ProductObjectT;
    productList.products.push(newProduct);

    await updateProductList(productListId, productList);
  } catch (error) {
    console.error(error);
  }
};

export const updateProductList = async (
  userId: string,
  productList: ProductObjectT
) => {
  await updateDoc(doc(dbProductsCollection, userId), {
    ...productList,
  });
};

export const getProductList = async () => {
  try {
    // const isInDB = await isclientListInDB(uid);
    const response = await getDoc(doc(dbProductsCollection, productListId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};
