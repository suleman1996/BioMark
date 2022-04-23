import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import styles from './styles';
import Button from '../../../components/button/button';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import BackIcon from '../../../assets/svgs/back';
import StepIndicator from 'react-native-step-indicator';
import OtpInput from '../../../components/otp/otpInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import ActivityIndicator from '../../../components/loader/activity-indicator';
import {
  resendAccountCode,
  signupAccountConfirm,
} from '../../../services/auth-service';
import {showMessage, hideMessage} from 'react-native-flash-message';

export default function SignupVerification() {
  const labels = ['Personal Details', 'Verification', 'Confirmation']; //signup navigation labels

  let initialMinutes = 1;
  let initialSeconds = 0;

  const [code, setCode] = React.useState('');
  const [clearOTP, setClearOTP] = React.useState(false);
  const OTPRef = useRef(null);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [loading, setLoading] = useState(false);

  const navigations = useNavigation();
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
      const result = await resendAccountCode({
        confirmation: {
          username: route?.params?.username,
        },
      });
      console.log('success resend account code ', result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
      const result = await signupAccountConfirm({
        confirmation: {
          username: route?.params?.username,
          password: route?.params?.password,
          code: code,
        },
      });
      console.log('Signup confirmaton ', result.data);
      navigations.navigate('Confirmation');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.errMsg);
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
      <View style={{flex: 1}}>
        <View style={styles.signupNav}>
          <View style={styles.csNav}>
            <BackIcon onPress={() => navigations.goBack()} />
            <Text style={styles.signupText}>Back</Text>
          </View>
          <StepIndicator
            stepCount={3}
            customStyles={styles.stepIndicator}
            labels={labels}
            currentPosition={1}
          />
        </View>

        <View style={styles.OTPContainer}>
          <ScrollView style={{marginBottom: 40}}>
            <View>
              <Text style={styles.heading}>Enter your OTP Code</Text>
              <Text style={styles.upperText}>
                You will receive a verification code with the mobile number you
                have provided. Check your phone and enter the OTP code below.
              </Text>
              <View style={{marginTop: 30, height: 50}}>
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
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.black,
                    fontSize: 15,
                    // marginBottom: 170,
                    fontFamily: fonts.regular,
                  }}>
                  <Text>Not received? </Text>
                  <Text style={{color: colors.blue}}>
                    Resend OTP Code {minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={{}}>
            <View style={styles.callUsText}>
              {/* <CheckBox /> */}
              <TouchableOpacity>
                <Text style={styles.callUsTextStyle}>
                  <Text>Having trouble? </Text>
                  <Text
                    style={{
                      color: colors.blue,
                      fontSize: 15,
                      fontFamily: fonts.bold,
                    }}>
                    contact us
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              disabled={code.length < 6 ? true : false}
              title="Continue"
              onPress={() => handleSignUP()}
            />
          </View>
        </View>
      </View>
    </>
  );
}
