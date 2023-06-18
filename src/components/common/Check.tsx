import React from 'react';
import {TouchableOpacity} from 'react-native';
import CheckOn from '../../assets/icons/check-on.svg';
import CheckOff from '../../assets/icons/check-off.svg';
interface CheckProps {
  /* on off 값 */
  checked: boolean;
  // setState 함수 (onChange, setChecked) 중 하나만 택해서 넣기
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  // 눌렀을시 콜백함수
  onChange?: () => void;
}

const Check = ({checked, setChecked, onChange}: CheckProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (setChecked) {
          setChecked(!checked);
        } else if (onChange) {
          onChange();
        }
      }}>
      {checked ? <CheckOn /> : <CheckOff />}
    </TouchableOpacity>
  );
};

export default Check;
