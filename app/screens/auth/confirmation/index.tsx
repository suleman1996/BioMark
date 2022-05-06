import { Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';

import styles from './styles';
import Button from 'components/button/button';
import SetToGo from 'assets/svgs/set-to-go';
import { Nav_Screens } from 'navigation/constants';

export default function Confirmation() {
  const labels = ['Personal Details', 'Verification', 'Confirmation']; //signup navigation labels
  const navigations = useNavigation();

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
          <Button
            disabled={false}
            title="Continue to Homepage"
            onPress={() => navigations.navigate(Nav_Screens.LoginScreen)}
          />
        </ScrollView>
      </View>
    </>
  );
}
