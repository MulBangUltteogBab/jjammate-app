import {selectorFamily} from 'recoil';
import http from '../utils/http';
import {userCodeSelector} from './setting';

export const basePost = selectorFamily({
  key: 'post',
  get:
    (params: string) =>
    async ({get}) => {
      try {
        const {data} = await http.post(params, get(userCodeSelector));
        return data;
      } catch (err) {
        console.log(err);
      }
    },
});
