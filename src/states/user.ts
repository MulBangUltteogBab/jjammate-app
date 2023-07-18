import {selector} from 'recoil';
import {basePost, trigerAtom} from './utils';

interface UserInfo {
  military_serial_number: string;
  username: string;
  department: string;
  sex: string;
  age: number;
  height: number;
  weight: number;
  bmi: number;
}
export const userInfoSelector = selector<UserInfo>({
  key: 'userInfoSelector',
  get: ({get}) => {
    get(trigerAtom);
    const data = get(basePost('/common/api/getmyinfo/'));
    if (data) {
      return data;
    } else {
      return {
        military_serial_number: '',
        username: '',
        department: '',
        sex: '',
        age: 0,
        height: 0,
        weight: 0,
        bmi: 0,
      };
    }
  },
});
