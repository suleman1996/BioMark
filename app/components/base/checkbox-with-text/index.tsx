import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CheckBox from 'react-native-check-box';

import { widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalColors } from 'utils/theme/global-colors';

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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  rightText: {
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(20),
    marginLeft: widthToDp(4),
    lineHeight: responsiveFontSize(30),
  },
  checkbox: {
    padding: 1,
  },
});
