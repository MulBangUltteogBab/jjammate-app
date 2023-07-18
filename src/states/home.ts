import {atom, selector} from 'recoil';
import {basePost, constPost, trigerAtom} from './utils';
import {Diet, Nutrition, PxFoods} from '../@types/nutrition';
import http from '../utils/http';
import {userCodeSelector} from './setting';

interface Kcal {
  taken: number;
  burned: number;
  remain: number;
  total: number;
}

export const kcalSelector = selector<Kcal>({
  key: 'kcalSelector',
  get: ({get}) => {
    const data = get(basePost('/common/api/getkcalstatus/'));
    get(trigerAtom);
    if (data) {
      return data;
    } else {
      return {
        taken: 0,
        burned: 0,
        remain: 0,
      };
    }
  },
});

export const nutritionSelector = selector<Nutrition>({
  key: 'nutritionSelector',
  get: ({get}) => {
    const data = get(basePost('/common/api/getnutritionstatus/'));
    get(trigerAtom);
    if (data) {
      return data;
    } else {
      return {
        taken: {
          carbohydrate: 0,
          protein: 0,
          fat: 0,
        },
        percent: {
          carbohydrate: 0,
          protein: 0,
          fat: 0,
        },
        total: {
          carbohydrate: 0,
          protein: 0,
          fat: 0,
        },
      };
    }
  },
});

export const dietAtom = atom<Diet>({
  key: 'dietAtom',
  default: undefined,
});

export const getDietSelector = selector<Diet>({
  key: 'getDietSelector',
  get: ({get}) => {
    return get(constPost('/diet/api/getdiet/'));
  },
});

export const pxFoodsAtom = atom<PxFoods>({
  key: 'pxFoodsAtom',
  default: undefined,
});

export const getPxFoodsSelector = selector<PxFoods>({
  key: 'getPxFoodsSelector',
  get: async ({get}) => {
    try {
      const {data} = await http.post(
        '/diet/api/recommend/',
        get(userCodeSelector),
      );
      return data;
    } catch (err: any) {
      console.log(err + '    pxfoods');
    }
  },
});

export const pxFoodsTotalAtom = atom<PxFoods>({
  key: 'pxFoodsTotalAtom',
  default: undefined,
});

export const getPxFoodsTotalSelector = selector<PxFoods>({
  key: 'getPxFoodsTotalSelector',
  get: async ({get}) => {
    try {
      const {data} = await http.post(
        '/diet/api/getpxfoodlist/',
        get(userCodeSelector),
      );
      return data;
    } catch (err: any) {
      console.log(err + '    pxFoodsTotal');
    }
  },
});
