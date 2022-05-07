import React from 'react';
import { Text, View } from 'react-native';

import { PhoneNumber } from 'components';
import { BioDangerWhite } from 'components/svg';

import { styles } from './styles';

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
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <>
      <View style={styles.container}>
        {disabled ? <View style={styles.disableContainer} /> : null}
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <View>
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
    </>
  );
};

export default PhoneNumberWithLabel;
