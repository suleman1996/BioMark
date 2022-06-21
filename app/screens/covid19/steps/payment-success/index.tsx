import React from 'react';

import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import StepIndicator from 'react-native-step-indicator';

import ButtonComponent from 'components/base/button';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { makeStyles } from './styles';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants/index';
import { useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';

type Props = {};

const labels = ['Booking', 'Payment', 'Confirmation'];

const PaymentSuccess = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const data = useSelector(
    (state: IAppState) => state.covid.covidSuccessPaymentData
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.stepContainer}>
          <StepIndicator
            renderStepIndicator={() => {
              return (
                <View>
                  <Feather
                    name="check"
                    size={responsiveFontSize(20)}
                    color="white"
                  />
                </View>
              );
            }}
            stepCount={3}
            currentPosition={2}
            customStyles={styles.stepIndicator}
            labels={labels}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.parent}>
            <View style={styles.circle}>
              <Feather
                name="check"
                size={responsiveFontSize(90)}
                color="white"
              />
            </View>
            <Text style={styles.title1}>Payment is Successful</Text>
            <Text style={styles.title2}>
              A confirmation email has been sent to you.
            </Text>
            <Text style={styles.title3}>
              A health declaration form{' '}
              <Text style={styles.title3inner}>
                will be sent to you {`\n`}24 hours before your COVID-19 test
                day.
              </Text>
            </Text>
            <Text style={styles.title4}>
              Your Dependant(s) Booking ID (s){' '}
              {data?.dependent_reference_codes?.map((item) => {
                return (
                  <>
                    <Text style={styles.title4inner}>
                      {`\n`}
                      {item.name}:{' '}
                      <Text style={styles.userCodeText}>
                        {item.reference_code}
                      </Text>
                    </Text>
                  </>
                );
              })}
            </Text>
          </View>
          <View style={styles.bottom2Btns}>
            <ButtonComponent
              onPress={() => navigate(SCREENS.HOME)}
              title={'View Bookings'}
            />
            <ButtonComponent
              bg={colors.lightBlue}
              color={colors.darkPrimary}
              onPress={() => navigate(SCREENS.HOME)}
              title={'Return to Homepage'}
              marginTop={1.5}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PaymentSuccess;
