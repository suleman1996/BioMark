import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Linking,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';

import { showMessage } from 'react-native-flash-message';

import { Button } from 'components/button';
import { Header, ActivityIndicator, OtpInput } from 'components';
import { useTheme } from 'react-native-paper';

import SCREENS from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { userService } from 'services/user-service/user-service';
import { logNow } from 'utils/functions/log-binder';
import { useTranslation } from 'react-i18next';

// import colors from 'assets/colors';

import makeStyles from './styles';
import { changePassword } from 'services/auth-service';

type Props = {
  route: any;
};

export default function OtpPassword(props: Props) {
  const { phone } = props.route.params;
  const { password } = props.route.params;
  let initialMinutes = 1;
  let initialSeconds = 0;

  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [code, setCode] = React.useState('');
  const [clearOTP, setClearOTP] = React.useState(false);
  const OTPRef = useRef(null);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [loading, setLoading] = useState(false);

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

  const openMessenger = () => {
    Linking.openURL(
      'mailto:support@biomarking.com?subject=SendMail&body=Description'
    );
  };

  const handleOTP = async () => {
    try {
      setLoading(true);

      Keyboard.dismiss();
      await changePassword({
        password: {
          username: phone,
          password: password,
          code: code,
        },
      });
      navigate(SCREENS.PASSWORD_CHANGED);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.errMsg.status == '500') {
        showMessage({
          message: "User not exist's",
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

  const resendOTP = async () => {
    setSeconds(initialSeconds);
    setMinutes(initialMinutes);

    setLoading(true);

    const username = phone;

    userService
      .forgotPassword(username)
      .then((res) => {
        logNow('response for forgot password on otp verify', res);
      })
      .catch((err) => {
        logNow('error on forgot password on otp verify', err);
        if (err.errMsg.status == '500') {
          showMessage({
            message: "User not exist's",
            type: 'danger',
          });
        }
        showMessage({
          message: err.errMsg.data.message,
          type: 'danger',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        <Header title={t('pages.resetPassword.title')} />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.body}>
            <Text style={styles.title}>
              {t('pages.resetPassword.otpCodeDescription')}
            </Text>
            <View style={{ height: 60 }}>
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
              <Text style={styles.resendText}>
                <Text style={{ color: colors.heading }}>
                  {t('pages.resetPassword.notReceived')}{' '}
                </Text>
                <Text style={{ color: colors.blue }}>
                  {t('pages.resetPassword.otpResend')} {minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.floatingBtn}>
              <Text style={styles.resendText}>
                <Text style={{ color: colors.heading }}>
                  {t('pages.signUp.allSet.actions.trouble.text')}
                </Text>
                <TouchableWithoutFeedback onPress={() => openMessenger()}>
                  <Text style={{ color: colors.blue }}>
                    {t('pages.signUp.allSet.actions.trouble.link')}{' '}
                  </Text>
                </TouchableWithoutFeedback>
              </Text>

              <Button
                onPress={() => handleOTP()}
                title={t('pages.resetPassword.continue')}
                disabled={code.length < 6 ? true : false}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}
