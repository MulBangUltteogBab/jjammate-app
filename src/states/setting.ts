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
