import { Text, Button } from "@chakra-ui/react";
import { ProductT } from "../types/productObject";
import { NumberInputElement } from "@/features/diet/components/NumberInput";
import { useState } from "react";

import { useUser } from "@/store/store";
import { useFormik } from "formik";
import { validationSchema } from "@/config/productInputValidationSchema";
import { useAddProductToDietDayMutation } from "@/features/dietDuringDay/services/dietDay";
import { uuid } from "uuidv4";
import { calcNutritionalValues } from "../helpers/calcNutritionalValues";

export const ProductItem = ({ productData }: { productData: ProductT }) => {
  const [isQuantityInputShow, setQuantityInputShow] = useState(false);
  const user = useUser();
  const [addProductToDietDay] = useAddProductToDietDayMutation();

  const handleSubmit = async () => {
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
  };

  const formik = useFormik({
    initialValues: { quantity: "" },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div>
      <Text>{productData.name}</Text>
      <Text>Calories {productData.calories}</Text>
      <Text>Protein: {productData.protein}</Text>
      <Text>Fats: {productData.fats}</Text>
      <Text>Carbohydrates: {productData.carbohydrates}</Text>
      {isQuantityInputShow && (
        <form onSubmit={formik.handleSubmit}>
          <NumberInputElement
            name="quantity"
            onChange={(v) => formik.setFieldValue("quantity", v)}
          />

          <Text>{productData.unit}</Text>
          <Text fontSize="md" color="red">
            {formik.errors.quantity}
          </Text>
          <Button type="submit" colorScheme="green" size="lg">
            Add
          </Button>
        </form>
      )}
      {!isQuantityInputShow && (
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => setQuantityInputShow(!isQuantityInputShow)}
        >
          Add meal
        </Button>
      )}
    </div>
  );
};
