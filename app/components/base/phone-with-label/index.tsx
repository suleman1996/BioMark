import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import PhoneNumber from 'components/phone-number';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp } from 'utils/functions/responsive-dimensions';

type Props = {
  label?: string;
  placeholder: string;
  disabled: boolean;
  number: any;
  country: any;
  setPhoneNumber: any;
};

const PhoneNumberWithLabel = ({
  label,
  placeholder,
  disabled,
  country,
  setPhoneNumber,
  number,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectCountryCode, setSelectCountryCode] = useState('PK');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [countryCode, setCountryCode] = useState('PK');
  // const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View>
        {disabled ? <View style={styles.disableContainer} /> : null}
        <PhoneNumber
          countryCode={country}
          setCountryCode={setCountryCode}
          phoneNumber={number}
          setPhoneNumber={setPhoneNumber}
          setSelectCountryCode={setSelectCountryCode}
          width={'100%'}
          placeholder={placeholder}
        />
      </View>
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
});
