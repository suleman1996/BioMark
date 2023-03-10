import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import CountryPicker, {
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';

import makeStyles from './styles';
import fonts from 'assets/fonts';

type Props = {
  width: string | number;
  setCountryCode: any;
  setSelectCountryCode: any;
  countryCode: any;
  maxLength: any;
  textInputColor?: any;
  phoneNumber: string;
  setPhoneNumber: any;
  placeholder: string;
  onBlur?: any;
};

export default function (props: Props) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { width, placeholder } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          backgroundColor: colors.white,
          onBackgroundTextColor: colors.black,
          fontSize: 15,
          fontFamily: fonts.mulishRegular,
        }}
        containerButtonStyle={styles.pickerButtonStyle}
        onSelect={(Country) => onSelect(Country)}
      />
      <TextInput
        placeholder={placeholder ? placeholder : 'Phone Number'}
        placeholderTextColor={colors.lightGrey}
        autoCapitalize={'none'}
        maxLength={props.maxLength}
        style={[
          styles.textInputStyle,
          {
            width: width ? width : '80%',
          },
          props.textInputColor,
        ]}
        value={props.phoneNumber}
        keyboardType={'number-pad'}
        onChangeText={(value) => props.setPhoneNumber(value)}
        onBlur={props.onBlur}
      />
    </View>
  );
}
