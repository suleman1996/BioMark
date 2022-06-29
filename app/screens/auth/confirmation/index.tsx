import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { Button } from 'components/button';
import { SetToGo } from 'assets/svgs/index';

import makeStyles from './styles';
import { loggedIn } from 'store/auth/auth-actions';
import { getAuthAsyncStorage } from 'services/async-storage/auth-async-storage';
import fonts from 'assets/fonts';
let timer = () => {};

export default function Confirmation() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const labels = ['Personal Details', 'Verification', 'Confirmation']; //signup navigation labels
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(60);

  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        loginDispatch();
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
  });
  const loginDispatch = async () => {
    const data = await getAuthAsyncStorage();

    await dispatch(loggedIn(data));
  };
  return (
    <>
      <View style={styles.signupNav}>
        <StepIndicator
          stepCount={3}
          customStyles={styles.stepIndicator}
          labels={labels}
          currentPosition={2}
        />
      </View>
      <View style={styles.STGContainer}>
        <ScrollView>
          <View style={styles.womanIcon}>
            <SetToGo height="244" width="243" />
            <Text style={styles.heading}>Set to Go!</Text>
          </View>
          <Text style={styles.lowerText}>
            Your account details has been verified. Taking you to the homepage.
          </Text>
        </ScrollView>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            color: colors.shineBlue,
            fontFamily: fonts.bold,
          }}
        >
          {timeLeft}
        </Text>
        <Button
          disabled={false}
          title="Continue to Homepage"
          onPress={() => loginDispatch()}
        />
      </View>
    </>
  );
}
