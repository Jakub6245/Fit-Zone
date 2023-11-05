import { ProductT } from "../types/productObject";

export const filterProducts = (data: ProductT[], phrase: string) => {
  if (phrase.length <= 2) return [];
  return data.filter((el) =>
    el.name.toLowerCase().includes(phrase.toLowerCase())
  );
};
