import {atom} from 'recoil';

export const registerInfoAtom = atom({
  key: 'userInfo',
  default: {
    username: '',
    military_serial_number: '',
    password: '',
    passwordConfirm: '',
    department: '',
    height: 0,
    weight: 0,
    age: 0,
    sex: '',
    agreement: false,
  },
});

export const isReadyAtom = atom({
  key: 'isReady',
  default: {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: true,
  } as {[key: number]: boolean},
});
