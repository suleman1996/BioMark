import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import colors from '../../../assets/colors';
import Button from '../../../components/button/button';
import Header from '../../../components/header';
import ActivityIndicator from '../../../components/loader/activity-indicator';
import OtpInput from '../../../components/otp/otp-input';
import {Nav_Screens} from '../../../navigation/constants';
import {forgotPassword} from '../../../services/auth-service';
import {navigate} from '../../../services/nav-ref';
import {userService} from '../../../services/user-service/user-service';
import {logNow} from '../../../utils/functions/log-binder';
import styles from './style';

type Props = {
  route: any;
};

export default function OtpPassword(props: Props) {
  const {phone} = props.route.params;

  const navigations = useNavigation();
  const route = useRoute();
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

  const handleOTP = async () => {
    try {
      setLoading(true);
      navigate(Nav_Screens.CreatePasswordScreen, {
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
      .then(res => {
        logNow('response for forgot password on otp verify', res);
      })
      .catch(err => {
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
            <View style={{height: 60}}>
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
              style={{marginTop: 30}}>
              <Text style={styles.resendText}>
                <Text style={{color: colors.heading}}>Not received? </Text>
                <Text style={{color: colors.blue}}>
                  Resend OTP {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.floatingBtn}>
              <TouchableOpacity style={{marginVertical: 10}}>
                <Text style={styles.resendText}>
                  <Text style={{color: colors.heading}}>Having trouble? </Text>
                  <Text style={{color: colors.blue}}>contact us </Text>
                </Text>
              </TouchableOpacity>
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
