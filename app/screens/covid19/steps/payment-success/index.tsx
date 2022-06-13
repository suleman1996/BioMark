import React from 'react';

import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import StepIndicator from 'react-native-step-indicator';

import ButtonComponent from 'components/base/button';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { makeStyles } from './styles';

type Props = {};

const labels = ['Booking', 'Payment', 'Confirmation'];

const PaymentSuccess = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

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
              <Text style={styles.title4inner}>
                {`\n`}Deku Midoriya:{' '}
                <Text style={styles.userCodeText}>CVD-FUAIWK</Text>
              </Text>
            </Text>
          </View>
          <View style={styles.bottom2Btns}>
            <ButtonComponent onPress={undefined} title={'View Bookings'} />
            <ButtonComponent
              bg={colors.lightBlue}
              color={colors.darkPrimary}
              onPress={undefined}
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
