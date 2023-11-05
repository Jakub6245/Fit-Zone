export type DietObjectT = {
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
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

export type SavedDietDaysObjectType = {
  savedDietDays: SavedDietDaysType[];
};

export type SavedDietDaysType = {
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
  date: string;
};
