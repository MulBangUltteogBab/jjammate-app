import {atom, selector} from 'recoil';
import http from '../utils/http';
import {userCodeSelector} from './setting';
import {PxFood} from '../@types/nutrition';
import {trigerAtom} from './utils';

export type TakenFoods = {
  taken: PxFood[];
};

export const takenFoodsAtom = atom<TakenFoods>({
  key: 'takenFoodsAtom',
  default: undefined,
});

export const getTakenFoodsSelector = selector<TakenFoods>({
  key: 'getTakenFoodsSelector',
  get: async ({get}) => {
    get(trigerAtom);
    try {
      const {data} = await http.post(
        '/diet/api/gettakenfood/',
        get(userCodeSelector),
      );
      return data;
    } catch (err: any) {
      console.log(err + '    TakenFoods');
    }
  },
});
