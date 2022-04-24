import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TitleWithBackWhiteBgLayout from '../../../../../components/layouts/back-with-title-white-bg'
import { styles } from './styles'
import PhoneNumberWithLabel from '../../../../../components/base/phone-with-label'
import { useSelector } from 'react-redux'
import { IAppState } from '../../../../../store/IAppState'
import parsePhoneNumber from 'libphonenumber-js';
import { logNow } from '../../../../../utils/functions/logBinder'

type Props = {}

const PhoneChangeScreen = (props: Props) => {

  const [countryCode, setCountryCode] = useState<any>();
  const [number, setNumber] = useState<any>();

  const userContacts = useSelector(
    (state: IAppState) => state.auth.userContacts,
  );

  

  useEffect(() => {
    const phoneNumber = parsePhoneNumber(userContacts.mobile);
    setCountryCode(phoneNumber?.country);
    setNumber(phoneNumber?.nationalNumber);

  }, [userContacts])



  return (
    <SafeAreaView style={{flex: 1}}>
      <TitleWithBackWhiteBgLayout title="Phone">
        <View style={styles.container}>
          <Text style={styles.phoneText}>Mobile Number</Text>
          <PhoneNumberWithLabel
            country={countryCode}
            number={number}
            disabled={true}
            placeholder={number}
          />
        </View>
      </TitleWithBackWhiteBgLayout>
    </SafeAreaView>
  );
}

export default PhoneChangeScreen;