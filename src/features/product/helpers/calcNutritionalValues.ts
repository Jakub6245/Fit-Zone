export const calcNutritionalValues = (
  productData: number,
  quantity: string
) => {
  return Number((productData * (Number(quantity) / 100)).toFixed(1));
};
