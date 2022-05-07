import React from 'react';
import { Text, View } from 'react-native';
import CheckBox from 'react-native-check-box';

import { GlobalColors } from 'utils/theme/global-colors';
import { styles } from './styles';
type Props = {
  isChecked: boolean;
  setIsChecked: any;
  rightText: string;
};

const CheckBoxWithText = (props: Props) => {
  const { isChecked, setIsChecked, rightText } = props;
  return (
    <View style={styles.container}>
      <CheckBox
        checkBoxColor={GlobalColors.primary}
        style={styles.checkbox}
        leftTextStyle={styles.rightText}
        onClick={() => {
          setIsChecked(!isChecked);
        }}
        isChecked={isChecked}
      />
      {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}
    </View>
  );
};

export default CheckBoxWithText;
