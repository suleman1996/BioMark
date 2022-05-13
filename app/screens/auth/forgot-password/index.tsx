import React, { useEffect, useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';

import { showMessage } from 'react-native-flash-message';

import { Button } from 'components/button';
import { Header, ActivityIndicator, PhoneNumber } from 'components';

import SCREENS from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { userService } from 'services/user-service/user-service';
import { ForgotPasswordErrorResponse } from 'types/auth/ForgotPassword';
import { logNow } from 'utils/functions/log-binder';

import styles from './styles';
import { useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';

export default function ForgotPassword() {
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCountryCode, setSelectCountryCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [numberCondition, setNumberCondition] = useState({ min: 8, max: 11 });
  const geoLocation = useSelector(
    (state: IAppState) => state.account.geolocation
  );

  useEffect(() => {
    if (selectCountryCode == '60') {
      setNumberCondition({ min: 8, max: 11 });
    } else if (selectCountryCode == '63') {
      setNumberCondition({ min: 10, max: 10 });
    } else if (selectCountryCode == '65') {
      setNumberCondition({ min: 8, max: 8 });
    } else {
      setNumberCondition({ min: 4, max: 13 });
    }
  }, [selectCountryCode]);

  useEffect(() => {
    console.log('locc =======>', geoLocation);
    if (geoLocation.code) {
      setCountryCode(geoLocation.code);
      let countryCodeParse = geoLocation.dial_code.replace('+', '');
      setSelectCountryCode(countryCodeParse);
    }
  }, [geoLocation]);

  const handleForgotPassword = async () => {
    setLoading(true);
    Keyboard.dismiss();
    const username: string = `+${selectCountryCode}${phoneNumber}`;
    userService
      .forgotPassword(username)
      .then(() => {
        // navigate(SCREENS.PASSWORD_OTP, { phone: username });
        navigate(SCREENS.CREATE_PASSWORD, { phone: username });
      })
      .catch((err: ForgotPasswordErrorResponse) => {
        logNow(err);
        if (err.errMsg.status == 500) {
          showMessage({
            message: 'User not found',
            type: 'danger',
          });
        } else {
          showMessage({
            message: err.errMsg.data.message,
            type: 'danger',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
                onPress={() =>
                  phoneNumber.length >= numberCondition.min &&
                  handleForgotPassword()
                }
                title="Continue"
                disabled={
                  // phoneNumber.length < numberCondition.min ? true : false
                  phoneNumber.length < 1 ? true : false
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}
