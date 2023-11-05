import { Text } from "@chakra-ui/react";
import { ProductT } from "../../types/productObject";

import { useState } from "react";
import styles from "./styles.module.scss";
import { useUser } from "@/store/store";
import { useFormik } from "formik";
import { validationSchema } from "@/config/validation/productInputValidationSchema";
import { useAddProductToDietDayMutation } from "@/features/dietDuringDay/services/dietDay";
import { uuid } from "uuidv4";
import { calcNutritionalValues } from "../../helpers/calcNutritionalValues";

export const ProductItem = ({ productData }: { productData: ProductT }) => {
  const [isQuantityInputShow, setQuantityInputShow] = useState(false);
  const user = useUser();
  const [addProductToDietDay] = useAddProductToDietDayMutation();

  const handleSubmit = () => {
    setQuantityInputShow(!isQuantityInputShow);

    addProductToDietDay({
      dietDayId: user.dietDayObjectId,
      productData: {
        id: uuid(),
        ...productData,
        protein: calcNutritionalValues(
          productData.protein,
          formik.values.quantity
        ),
        fats: calcNutritionalValues(productData.fats, formik.values.quantity),
        calories: calcNutritionalValues(
          productData.calories,
          formik.values.quantity
        ),
        carbohydrates: calcNutritionalValues(
          productData.carbohydrates,
          formik.values.quantity
        ),
        quantity: formik.values.quantity,
      },
    });
    formik.values.quantity = "";
  };

  const formik = useFormik({
    initialValues: { quantity: "" },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className={styles.product__item__container}>
      <p>{productData.name}</p>
      <p>Calories: {productData.calories}</p>
      <p>Protein: {productData.protein}</p>
      <p>Fats: {productData.fats}</p>
      <p>Carbohydrates: {productData.carbohydrates}</p>
      {isQuantityInputShow && (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.product__item__input__container}>
            <div>
              <input
                className={styles.product__item__input}
                type="number"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
              />
              <Text fontSize="3xl" color="red">
                {formik.errors.quantity}
              </Text>
            </div>
            <p>{productData.unit}</p>
            <button
              className={styles.product__item__input__button}
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      )}
      {!isQuantityInputShow && (
        <button
          className={styles.product__item__button}
          onClick={() => setQuantityInputShow(!isQuantityInputShow)}
        >
          Add meal
        </button>
      )}
    </div>
  );
};
