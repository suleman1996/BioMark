import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';

import { useSelector } from 'react-redux';
import parsePhoneNumber from 'libphonenumber-js';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import { PhoneNumberWithLabel } from 'components/base';

import { IAppState } from 'store/IAppState';
import { logNow } from 'utils/functions/log-binder';

import makeStyles from './styles';

const PhoneChangeScreen = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [countryCode, setCountryCode] = useState<any>();
  const [number, setNumber] = useState<any>();

  const geoLocation = useSelector(
    (state: IAppState) => state.account.geolocation
  );
  const userContacts = useSelector(
    (state: IAppState) => state.auth.userContacts
  );

  useEffect(() => {
    const phoneNumber = parsePhoneNumber(userContacts.mobile + '');
    logNow('parsed phone', phoneNumber?.countryCallingCode);
    if (phoneNumber?.country) {
      setCountryCode(phoneNumber?.country);
    } else {
      setCountryCode(geoLocation?.code);
    }
    setNumber(phoneNumber?.nationalNumber);
  }, [userContacts, geoLocation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackWhiteBgLayout title="Phone Number">
        <View style={styles.container}>
          <Text style={styles.phoneText}>Mobile Number</Text>
          <PhoneNumberWithLabel
            countryCode={countryCode}
            number={number}
            disabled={true}
            placeholder={number}
          />
        </View>
      </TitleWithBackWhiteBgLayout>
    </SafeAreaView>
  );
};

export default PhoneChangeScreen;
