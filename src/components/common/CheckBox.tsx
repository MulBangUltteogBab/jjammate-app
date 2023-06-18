import React from 'react';
import {TouchableOpacity} from 'react-native';
import CheckBoxOn from '../../assets/icons/checkbox-on.svg';
import CheckBoxOff from '../../assets/icons/checkbox-off.svg';
import {NumberProp} from 'react-native-svg';
interface CheckBoxProps {
  /* on off 값 */
  checked: boolean;
  // setState 함수 (onChange, setChecked) 중 하나만 택해서 넣기
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  // 컴포넌트 크기
  size?: NumberProp | undefined;
  // 눌렀을시 콜백함수
  onChange?: () => void;
}

const CheckBox = ({
  checked,
  setChecked,
  size = 16,
  onChange,
}: CheckBoxProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (setChecked) {
          setChecked(!checked);
        } else if (onChange) {
          onChange();
        }
      }}>
      {checked ? (
        <CheckBoxOn height={size} width={size} />
      ) : (
        <CheckBoxOff height={size} width={size} />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
