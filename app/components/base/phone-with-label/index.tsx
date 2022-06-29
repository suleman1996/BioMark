import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { PhoneNumber } from 'components';
import { BioDangerWhite } from 'components/svg';

import makeStyles from './styles';

type Props = {
  label?: string;
  placeholder: string;
  disabled: boolean;
  number: any;
  countryCode: any;
  setPhoneNumber: any;
  error?: string;
  setCountryCode: any;
  setSelectCountryCode: any;
  onBlur?: any;
  maxLength?: number;
  labelStyle?: any;
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
  setSelectCountryCode,
  onBlur,
  labelStyle,
  maxLength,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <>
      <View style={styles.container}>
        {disabled ? <View style={styles.disableContainer} /> : null}
        {label ? <Text style={(styles.label, labelStyle)}>{label}</Text> : null}
        <View>
          <PhoneNumber
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            phoneNumber={number}
            setPhoneNumber={setPhoneNumber}
            setSelectCountryCode={setSelectCountryCode}
            width={'100%'}
            placeholder={placeholder}
            maxLength={maxLength}
            onBlur={onBlur}
          />
        </View>
        {error ? (
          <View style={styles.errorContainer}>
            <BioDangerWhite width={3.5} height={3.5} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default PhoneNumberWithLabel;
