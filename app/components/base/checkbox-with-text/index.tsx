import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import CheckBox from 'react-native-check-box';

import makeStyles from './styles';

type Props = {
  isChecked: boolean;
  setIsChecked: any;
  rightText: string;
};

const CheckBoxWithText = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { isChecked, setIsChecked, rightText } = props;
  return (
    <View style={styles.container}>
      <CheckBox
        checkBoxColor={colors.primary}
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
