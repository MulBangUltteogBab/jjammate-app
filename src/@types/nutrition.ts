export type NutrientType = {
  value: number;
  total: number;
  percent: number;
};

export type PxItemType = {
  id: string;
  name: string;
  url: string;
  kcal: number;
  carbohydrate: NutrientType;
  protein: NutrientType;
  fat: NutrientType;
};
