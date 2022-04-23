import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import InputField from '../../input-field/input-field';
import { responsiveFontSize } from '../../../utils/functions/responsive-text';
import { GlobalFonts } from '../../../utils/theme/fonts';
import { GlobalColors } from '../../../utils/theme/global-colors';
import { heightToDp } from '../../../utils/functions/responsive-dimensions';

type Props = {
  label: string;
  placeholder: string;
  labelFontSize?: number;
  onChange: any;
  value: string;
};

const InputWithLabel = ({
  label,
  placeholder,
  onChange,
  labelFontSize,
  value,
}: Props) => {
  const ifLabelSize = labelFontSize
    ? { fontSize: responsiveFontSize(labelFontSize) }
    : {};
  return (
    <View style={styles.container}>
      <Text style={[styles.label, ifLabelSize]}>{label}</Text>
      <InputField
        placeholder={placeholder}
        onChange={onChange}
        svg={undefined}
        value={value}
      />
    </View>
  );
};

export default InputWithLabel;

const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(2),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
});
