import {selector} from 'recoil';
import {basePost} from './utils';

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
  get: async ({get}) => {
    return get(basePost('/common/api/getmyinfo/'));
  },
});
