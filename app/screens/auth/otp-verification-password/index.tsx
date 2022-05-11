import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Linking,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { showMessage } from 'react-native-flash-message';

import { Button } from 'components/button';
import { Header, ActivityIndicator, OtpInput } from 'components';

import SCREENS from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { userService } from 'services/user-service/user-service';
import { logNow } from 'utils/functions/log-binder';

import colors from 'assets/colors';

import styles from './style';

type Props = {
  route: any;
};

export default function OtpPassword(props: Props) {
  const { phone } = props.route.params;

  let initialMinutes = 1;
  let initialSeconds = 0;

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
    Linking.canOpenURL('mailto:support@biomarking.com');
  };

  const handleOTP = async () => {
    try {
      setLoading(true);
      navigate(SCREENS.CREATE_PASSWORD, {
        phone,
        otp: code,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
        <Header title="Reset Password" />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.body}>
            <Text style={styles.title}>
              You will receive a verification code on the mobile number you
              provided. Check your phone and enter the OTP code below.
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
                <Text style={{ color: colors.heading }}>Not received? </Text>
                <Text style={{ color: colors.blue }}>
                  Resend OTP {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.floatingBtn}>
              <Text style={styles.resendText}>
                <Text style={{ color: colors.heading }}>Having trouble? </Text>
                <TouchableWithoutFeedback onPress={() => openMessenger()}>
                  <Text style={{ color: colors.blue }}>contact us </Text>
                </TouchableWithoutFeedback>
              </Text>

              <Button
                onPress={() => handleOTP()}
                title="Continue"
                disabled={code.length < 6 ? true : false}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}
