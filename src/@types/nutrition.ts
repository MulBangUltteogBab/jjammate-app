export type NutrientType = {
  // 현재 영양소 용량 g
  value: number;
  // 전체 필요 영양소 g
  total: number;
  // 현재/전체 비율
  percent: number;
};

//px상품 정보
export type PxItemType = {
  //id
  id: string;
  //이름
  name: string;
  //이미지 url
  url: string;
  //칼로리
  kcal: number;
  //탄,단,지 정보
  carbohydrate: NutrientType;
  protein: NutrientType;
  fat: NutrientType;
};
