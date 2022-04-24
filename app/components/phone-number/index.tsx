import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import CountryPicker, {
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';

import colors from 'assets/colors';
import styles from './styles';

type Props = {
  width: string | number;
  setCountryCode: any;
  setSelectCountryCode: any;
  countryCode: any;
  maxLength: any;
  phoneNumber: string;
  setPhoneNumber: any;
  placeholder: string;
};

export default function phoneNumber(props: Props) {
  const { width, placeholder } = props;
  const [preferredCountries, setPreferredCountries] = useState([
    'MY',
    'PH',
    'SG',
    'ID',
    'TH',
    'VN',
  ]);

  const onSelect = (Country: any) => {
    props.setCountryCode(Country.cca2);
    props.setSelectCountryCode(Country.callingCode[0]);
  };

  return (
    <View
      style={[
        styles.countryPickerView,
        { width: props.width ? props.width : '90%' },
      ]}
    >
      <CountryPicker
        withCallingCode={true}
        countryCode={props.countryCode}
        withCallingCodeButton={true}
        withFilter={true}
        preferredCountries={preferredCountries}
        theme={{
          ...DEFAULT_THEME,
          backgroundColor: colors.whiteColor,
          onBackgroundTextColor: colors.heading,
          fontSize: 14,
        }}
        containerButtonStyle={styles.pickerButtonStyle}
        onSelect={(Country) => onSelect(Country)}
      />
      <TextInput
        placeholder={placeholder ? placeholder : 'Phone Number'}
        placeholderTextColor={colors.placeHolder}
        autoCapitalize={'none'}
        maxLength={props.maxLength}
        style={[
          styles.textInputStyle,
          {
            width: width ? width : '80%',
          },
        ]}
        value={props.phoneNumber}
        keyboardType={'number-pad'}
        onChangeText={(value) => props.setPhoneNumber(value)}
      />
    </View>
  );
}