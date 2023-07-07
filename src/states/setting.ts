import AsyncStorage from '@react-native-async-storage/async-storage';
import {atom, selector} from 'recoil';

const autoLoginAtom = atom({
  key: 'autoLoginAtom',
  default: false,
  effects: [
    ({setSelf}) => {
      AsyncStorage.getItem('autoLogin').then(autoLogin => {
        setSelf(autoLogin === 'true');
      });
    },
  ],
});

export const autoLoginState = selector({
  key: 'autoLoginSelector',
  get: ({get}) => {
    return get(autoLoginAtom);
  },
  set: ({set}, login) => {
    set(autoLoginAtom, login);
    try {
      AsyncStorage.setItem('autoLogin', login.toString());
    } catch (error) {
      console.error(error);
    }
  },
});

interface UserCode {
  military_serial_number: string;
}

const userCodeAtom = atom<UserCode>({
  key: 'userCodeAtom',
  default: {
    military_serial_number: '',
  },
  effects: [
    ({setSelf}) => {
      AsyncStorage.getItem('military_serial_number').then(code => {
        setSelf({
          military_serial_number: code ? code : '',
        });
      });
    },
  ],
});

export const userCodeSelector = selector({
  key: 'userCodeSelector',
  get: ({get}) => {
    return get(userCodeAtom);
  },
  set: ({set}, code) => {
    set(userCodeAtom, code);
    const userCode = code as UserCode;
    try {
      AsyncStorage.setItem(
        'military_serial_number',
        userCode.military_serial_number,
      );
    } catch (error) {
      console.error(error);
    }
  },
});
