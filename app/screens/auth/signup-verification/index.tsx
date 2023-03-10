import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import StepIndicator from 'react-native-step-indicator';

import { Button } from 'components/button';
import { OtpInput, ActivityIndicator } from 'components';

import { resendAccountCode, signupAccountConfirm } from 'services/auth-service';
import { navigate, goBack } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

import fonts from 'assets/fonts';
import BackIcon from 'assets/svgs/back';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';
import { setAuthAsyncStorage } from 'services/async-storage/auth-async-storage';
import Config from 'react-native-config';

export default function SignupVerification() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const labels = ['Personal Details', 'Verification', 'Confirmation']; //signup navigation labels

  let initialMinutes = 1;
  let initialSeconds = 0;

  const [code, setCode] = React.useState('');
  const [clearOTP, setClearOTP] = React.useState(false);
  const OTPRef = useRef(null);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const resendOTP = async () => {
    setSeconds(initialSeconds);
    setMinutes(initialMinutes);
    try {
      setLoading(true);
      await resendAccountCode({
        confirmation: {
          username: route?.params?.username,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error.errMsg.status == '500') {
        showMessage({
          message: "User already exist's",
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

  const handleSignUP = async () => {
    try {
      setLoading(true);
      const resData = await signupAccountConfirm({
        confirmation: {
          username: route?.params?.username,
          password: route?.params?.password,
          code: code,
        },
      });

      await setAuthAsyncStorage(resData);
      navigate(SCREENS.CONFIRMATION);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Invalid Code',
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
      <View style={{ flex: 1 }}>
        <View style={styles.signupNav}>
          <View style={styles.csNav}>
            <BackIcon onPress={() => goBack()} />
            <Text style={styles.signupText}>
              {t('pages.idVerification.backButton')}
            </Text>
          </View>
          <StepIndicator
            stepCount={3}
            customStyles={styles.stepIndicator}
            labels={labels}
            currentPosition={1}
          />
        </View>

        <View style={styles.OTPContainer}>
          <ScrollView style={{ marginBottom: 40 }}>
            <View>
              <Text style={styles.heading}>{t('pages.signUp.otpTitle')}</Text>
              <Text style={styles.upperText}>
                {t('pages.signUp.otpCodeDescription')}
              </Text>
              <View style={{ marginTop: 30, height: 50 }}>
                <OtpInput
                  code={code}
                  setCode={setCode}
                  clearOTP={clearOTP}
                  setClearOTP={setClearOTP}
                  OTPRef={OTPRef}
                />
              </View>

              <TouchableOpacity
                disabled={seconds === 0 ? false : true}
                onPress={() => {
                  resendOTP();
                }}
                style={{ marginTop: 30 }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.black,
                    fontSize: 15,
                    // marginBottom: 170,
                    fontFamily: fonts.mulishRegular,
                  }}
                >
                  <Text>{t('pages.resetPassword.notReceived')} </Text>
                  <Text style={{ color: colors.blue }}>
                    {t('pages.resetPassword.otpResend')} {minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={{}}>
            <View style={styles.callUsText}>
              {/* <CheckBox /> */}

              <Text style={styles.callUsTextStyle}>
                <Text>{t('pages.signUp.allSet.actions.trouble.text')} </Text>
                <Text
                  style={{
                    color: colors.blue,
                    fontSize: 15,
                    fontFamily: fonts.bold,
                  }}
                  onPress={() => Linking.openURL(Config.MESSENGER_URL)}
                >
                  {t('pages.signUp.allSet.actions.trouble.link')}
                </Text>
              </Text>
            </View>
            <Button
              // disabled={code.length < 6 ? true : false}
              title={t('pages.signUp.continue')}
              onPress={() => handleSignUP()}
            />
          </View>
        </View>
      </View>
    </>
  );
}
