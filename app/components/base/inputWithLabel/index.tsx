import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputField from '../../input-field/input-field'
import { responsiveFontSize } from '../../../utils/functions/responsiveText';
import { GlobalFonts } from '../../../utils/theme/fonts';
import { GlobalColors } from '../../../utils/theme/globalColors';
import { heightToDp } from '../../../utils/functions/responsiveDimentions';

type Props = {
  label: string,
  placeholder: string
}

const InputWithLabel = ({label, placeholder}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <InputField placeholder={placeholder} />
    </View>
  );
};

export default InputWithLabel

const styles = StyleSheet.create({
          container: {
                    marginTop: heightToDp(2)
          },
          label: {
                    fontSize: responsiveFontSize(22),
                    fontFamily: GlobalFonts.medium,
                    color: GlobalColors.darkPrimary
          }
})