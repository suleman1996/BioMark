import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { InputField } from 'components';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { BioDangerWhite } from 'components/svg';

type Props = {
  label: string;
  placeholder: string;
  labelFontSize?: number;
  onChange: any;
  value: string;
  onFocus?: any;
  error?: any;
};

const InputWithLabel = ({
  label,
  placeholder,
  onChange,
  labelFontSize,
  value,
  onFocus,
  error,
}: Props) => {
  const ifLabelSize = labelFontSize
    ? { fontSize: responsiveFontSize(labelFontSize) }
    : {};
  return (
    <View style={styles.container}>
      <Text style={[styles.label, ifLabelSize]}>{label}</Text>
      <InputField
        onFocus={onFocus}
        placeholder={placeholder}
        onChange={onChange}
        svg={undefined}
        value={value}
      />
      {error ? (
        <View style={styles.errorContainer}>
          <BioDangerWhite width={3.5} height={3.5} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
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
  errorContainer: {
    width: '100%',
    paddingVertical: heightToDp(0.3),
    paddingHorizontal: widthToDp(4),
    backgroundColor: GlobalColors.red,
    borderBottomLeftRadius: widthToDp(2),
    borderBottomRightRadius: widthToDp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: GlobalColors.white,
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(14),
    paddingLeft: widthToDp(3),
  },
});
