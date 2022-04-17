import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Keyboard, Text, TouchableWithoutFeedback, View
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Button from '../../../components/button/button';
import Header from '../../../components/header/header';
import ActivityIndicator from '../../../components/loader/activity-indicator';
import PhoneNumber from '../../../components/phone-number/phone-number';
import { forgotPassword } from '../../../services/auth-service';
import styles from './styles';

export default function ForgotPassword() {
  const navigations = useNavigation();

  const [countryCode, setCountryCode] = useState('MY');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCountryCode, setSelectCountryCode] = useState('60');
  const [loading, setLoading] = useState(false);
  const [numberCondition, setNumberCondition] = useState({min: 8, max: 11});

  useEffect(() => {
    if (selectCountryCode == '60') setNumberCondition({min: 8, max: 11});
    else if (selectCountryCode == '63') setNumberCondition({min: 10, max: 10});
    else if (selectCountryCode == '65') setNumberCondition({min: 8, max: 8});
    else {
      setNumberCondition({min: 4, max: 13});
    }
  }, [selectCountryCode]);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const result = await forgotPassword({
        password: {username: `+${selectCountryCode}${phoneNumber}`},
      });
      console.log('Forgot Password Success API ', result.data);
      navigations.navigate('PasswordOTP', {
        phone: `+${selectCountryCode}${phoneNumber}`,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.errMsg);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Account not found',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        <Header title="Reset Password" />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.body}>
            <Text style={styles.title}>
              Don't worry! We'll help you get back on track.
            </Text>
            <Text style={styles.inputLablel}>Mobile Number</Text>
            <PhoneNumber
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setSelectCountryCode={setSelectCountryCode}
              width="100%"
              maxLength={numberCondition.max}
            />
            {phoneNumber !== '' && phoneNumber.length < numberCondition.min && (
              <Text style={styles.errorMessage}>
                Must have {numberCondition.min}
                {numberCondition.max !== numberCondition.min &&
                  -numberCondition.max}{' '}
                characters
              </Text>
            )}
            <View style={styles.floatingBtn}>
              <Button
                onPress={() => handleForgotPassword()}
                title="Continue"
                disabled={
                  phoneNumber.length < numberCondition.min ? true : false
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}
