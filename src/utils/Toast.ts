import Toast from 'react-native-toast-message';

const showToast = (message: string, type: string) => {
  Toast.show({
    type: type,
    position: 'bottom',
    text1: message,
    visibilityTime: 1500,
    bottomOffset: 80,
  });
};

export default showToast;
