import {atom} from 'recoil';

export const registerInfoAtom = atom({
  key: 'userInfo',
  default: {
    nickName: '',
    serialNumber: '',
    password: '',
    passwordConfirm: '',
    department: -1,
    height: 0,
    weight: 0,
    age: 0,
    gender: '',
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

export const registerAgreeAtom = atom({
  key: 'registerAgree',
  default: {
    age: false,
    term: false,
    privacy: false,
    ad: false,
  },
});
