import React from 'react';
import {TouchableOpacity} from 'react-native';
import CheckOn from '../assets/icons/check-on.svg';
import CheckOff from '../assets/icons/check-off.svg';
interface CheckProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Check = ({checked, setChecked}: CheckProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setChecked(!checked);
      }}>
      {checked ? <CheckOn /> : <CheckOff />}
    </TouchableOpacity>
  );
};

export default Check;
