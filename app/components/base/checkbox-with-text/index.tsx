import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import CheckBox from 'react-native-check-box';

import makeStyles from './styles';

type Props = {
  isChecked: boolean;
  setIsChecked: any;
  rightText?: string;
  textComponent?: any;
  checkBoxView?: any;
  textStyle?: any;
};

const CheckBoxWithText = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { isChecked, setIsChecked, rightText, textComponent } = props;
  return (
    <View style={[styles.container, props.checkBoxView]}>
      <CheckBox
        checkBoxColor={colors.primary}
        style={styles.checkbox}
        leftTextStyle={styles.rightText}
        onClick={() => {
          setIsChecked(!isChecked);
        }}
        isChecked={isChecked}
      />
      {rightText ? (
        textComponent ? (
          textComponent
        ) : (
          <Text style={(styles.rightText, props.textStyle)}>{rightText}</Text>
        )
      ) : null}
    </View>
  );
};

export default CheckBoxWithText;
