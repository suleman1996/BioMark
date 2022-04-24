import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import InputField from '../../input-field/input-field';
import {responsiveFontSize} from '../../../utils/functions/responsiveText';
import {GlobalFonts} from '../../../utils/theme/fonts';
import {GlobalColors} from '../../../utils/theme/globalColors';
import {heightToDp} from '../../../utils/functions/responsiveDimentions';
import PhoneNumber from '../../phone-number/phone-number'

type Props = {
  label?: string;
  placeholder: string;
  disabled: boolean;
  number: any;
  country: any;
};

const PhoneNumberWithLabel = ({
  label,
  placeholder,
  disabled,
  country,
  number,
}: Props) => {
  const [selectCountryCode, setSelectCountryCode] = useState('PK');
  const [countryCode, setCountryCode] = useState('PK');
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View>
        {disabled ? <View style={styles.disableContainer} /> : null}
        <PhoneNumber
          countryCode={country}
          setCountryCode={setCountryCode}
          phoneNumber={phoneNumber}
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
    zIndex: 999
  }
});
