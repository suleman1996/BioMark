import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import { GlobalColors } from '../../../utils/theme/globalColors';
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions';
import { responsiveFontSize } from '../../../utils/functions/responsiveText';
import { GlobalFonts } from '../../../utils/theme/fonts';

type Props = {
  question: string,
  isTrue: boolean,
  setIsTrue: any,
}

const RadioButtonQuestionComponent = ({question, isTrue, setIsTrue}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.qText}>{question}</Text>
      <View style={styles.radioContainer}>
        <View style={styles.singleRadioContainer}>
          <RadioButton
            value="first"
            status={isTrue ? 'checked' : 'unchecked'}
            onPress={() => setIsTrue(true)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.radioLabel}>Yes</Text>
        </View>
        <View style={styles.singleRadioContainer}>
          <RadioButton
            value="second"
            status={!isTrue ? 'checked' : 'unchecked'}
            onPress={() => setIsTrue(false)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.radioLabel}>No</Text>
        </View>
      </View>
    </View>
  );
};

export default RadioButtonQuestionComponent

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: widthToDp(4),
  },
  qText: {
          fontSize: responsiveFontSize(20),
            fontFamily: GlobalFonts.extraBold,
            color: GlobalColors.darkPrimary,
            marginTop: heightToDp(2),
  },
  singleRadioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: widthToDp(3),
  },
  radioLabel: {
            fontSize: responsiveFontSize(20),
            fontFamily: GlobalFonts.regular
  }
});