import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import PhoneNumber from 'components/phone-number';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import BioDangerWhite from 'components/svg/bio-danger-white';

type Props = {
  label?: string;
  placeholder: string;
  disabled: boolean;
  number: any;
  countryCode: any;
  setPhoneNumber: any;
  error?: string;
  setCountryCode: any;
};

const PhoneNumberWithLabel = ({
  label,
  placeholder,
  disabled,
  countryCode,
  setPhoneNumber,
  number,
  error,
  setCountryCode,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectCountryCode, setSelectCountryCode] = useState('PK');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View>
        {disabled ? <View style={styles.disableContainer} /> : null}
        <PhoneNumber
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          phoneNumber={number}
          setPhoneNumber={setPhoneNumber}
          setSelectCountryCode={setSelectCountryCode}
          width={'100%'}
          placeholder={placeholder}
          maxLength={undefined}
        />
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <BioDangerWhite width={3.5} height={3.5} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default PhoneNumberWithLabel;

const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(2),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
  disableContainer: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  phoneContainer: {
    zIndex: 999,
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
