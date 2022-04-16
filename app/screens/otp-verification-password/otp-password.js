import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import styles from './style';
import Header from '../../components/header/header';
import Button from '../../components/button/button';
import OtpInput from '../../components/otp/otpInput';
import colors from '../../assets/colors/colors';
import {TouchableRipple} from 'react-native-paper';
import ActivityIndicator from '../../components/loader/activity-indicator';
import {forgotPassword, otpConfirmation} from '../../services/auth-service';
import {showMessage, hideMessage} from 'react-native-flash-message';

export default function OtpPassword() {
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
      navigations.navigate('CreatePassword', {
        phone: route.params.phone,
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
    try {
      setLoading(true);

      const result = await forgotPassword({
        password: {username: route?.params?.phone},
      });
      console.log('Resend Success API ', result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.errMsg);
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
