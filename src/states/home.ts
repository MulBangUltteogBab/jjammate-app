import {selector} from 'recoil';
import {basePost} from './utils';
import {Nutrition} from '../@types/nutrition';
import {userInfoSelector} from './user';
import http from '../utils/http';

interface Kcal {
  taken: number;
  burned: number;
  remain: number;
}
export const kcalSelector = selector<Kcal>({
  key: 'kcalSelector',
  get: ({get}) => {
    return get(basePost('/common/api/getkcalstatus/'));
  },
});

export const nutritionSelector = selector<Nutrition>({
  key: 'nutritionSelector',
  get: ({get}) => {
    return get(basePost('/common/api/getnutritionstatus/'));
  },
});

export const getDietSelector = selector({
  key: 'getDietSelector',
  get: async ({get}) => {
    const {department} = get(userInfoSelector);
    try {
      const {data} = await http.post('/diet/api/getdiet/', {
        military_number: department,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  },
});
