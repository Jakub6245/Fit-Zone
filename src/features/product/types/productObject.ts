export type ProductObjectT = {
  products: {
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
    unit: string;
  }[];
};

export type ProductT = {
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  unit: string;
};
