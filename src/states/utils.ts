import {atom, selectorFamily} from 'recoil';
import http from '../utils/http';
import {userCodeSelector} from './setting';

export const basePost = selectorFamily({
  key: 'post',
  get:
    (params: string) =>
    async ({get}) => {
      try {
        const {data} = await http.post(params, get(userCodeSelector));
        get(trigerAtom);
        return data;
      } catch (err) {
        console.log(err + '    ' + params);
        return undefined;
      }
    },
});

export const constPost = selectorFamily({
  key: 'constPost',
  get:
    (params: string) =>
    async ({get}) => {
      try {
        const {data} = await http.post(params, get(userCodeSelector));
        return data;
      } catch (err) {
        console.log(err + '    ' + params);
        return undefined;
      }
    },
});

// export const paramsPost = selectorFamily({
//   key: 'paramsPost',
//   get:
//     (params: any) =>
//     async ({get}) => {
//       try {
//         const {data} = await http.post(params.url, {
//           ...get(userCodeSelector),
//           ...params.data,
//         });
//         return data;
//       } catch (err) {
//         console.log(err + '    ' + params.url + '    ' + params.data);
//         return undefined;
//       }
//     },
// });

export const trigerAtom = atom({
  key: 'triger',
  default: 0,
});
