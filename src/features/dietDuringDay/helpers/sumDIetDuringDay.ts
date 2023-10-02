import { DietDayProductT } from "@/features/product/types/productObject";

export const calculateSum = <T>(
  array: DietDayProductT[],
  property: keyof DietDayProductT
) => {
  const total = array.reduce((accumulator, object) => {
    const microElement = object[property] as number;
    return accumulator + microElement;
  }, 0);
  if (total % 1 === 0) {
    return total;
  }
  return total.toFixed(1);
};
