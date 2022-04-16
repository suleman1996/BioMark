import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import CountryPicker, {DEFAULT_THEME} from 'react-native-country-picker-modal';
import colors from '../../assets/colors/colors';
import styles from './styles';

export default function phoneNumber(props) {
  const {width} = props;
  const onSelect = Country => {
    props.setCountryCode(Country.cca2);
    props.setSelectCountryCode(Country.callingCode[0]);
    console.log(Country);
  };
  const [preferredCountries, setPreferredCountries] = useState([
    'MY',
    'PH',
    'SG',
    'ID',
    'TH',
    'VN',
  ]);
  return (
    <View
      style={[
        styles.countryPickerView,
        {width: props.width ? props.width : '90%'},
      ]}>
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
        onSelect={Country => onSelect(Country)}
      />
      <TextInput
        placeholder={'Phone Number'}
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
        onChangeText={value => props.setPhoneNumber(value)}
      />
    </View>
  );
}
