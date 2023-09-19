import { DietDayProductT } from "@/features/product/types/productObject";
import { Text, Button } from "@chakra-ui/react";
import { useDeleteProductFromDietDayMutation } from "../../services/dietDay";
import { useUser } from "@/store/store";
import { useState } from "react";
import styles from "./styles.module.scss";

export const DietDayProdcut = ({
  productData,
}: {
  productData: DietDayProductT;
}) => {
  const user = useUser();
  const [deleteProductFromDietDay] = useDeleteProductFromDietDayMutation();

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    deleteProductFromDietDay({
      dietDayId: user.dietDayObjectId,
      productId: productData.id,
    });
  };

  return (
    <div
      className={styles.diet__during__day__container}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <p className={styles.diet__during__day__label}>{productData.name}:</p>
      <p className={styles.diet__during__day__label}>
        Calories: {productData.calories}
      </p>
      <p className={styles.diet__during__day__label}>
        Protein: {productData.protein}
      </p>
      <p className={styles.diet__during__day__label}>
        Fats: {productData.fats}
      </p>
      <p className={styles.diet__during__day__label}>
        Carbohydrates: {productData.carbohydrates}
      </p>
      <p className={styles.diet__during__day__label}>
        Quantity: {productData.quantity} {productData.unit}
      </p>
      {isHovering && (
        <Button onClick={handleClick} colorScheme="red" size="lg">
          Delete
        </Button>
      )}
    </div>
  );
};
