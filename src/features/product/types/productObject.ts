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

export type DietDayProductObjectT = {
  dietDay: {
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
    quantity: string;
    unit: string;
    id: string;
  }[];
};

export type DietDayProductT = {
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  quantity: string;
  unit: string;
  id: string;
};
