import React from 'react';

import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import fonts from 'assets/fonts';
import ButtonComponent from 'components/base/button';
import { goBack } from 'services/nav-ref';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { makeStyles } from './styles';

type Props = {};

const labels = ['Booking', 'Payment', 'Confirmation'];

const PaymentFailed = (props: Props) => {
  const {} = props;
  const { colors }: any = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.stepContainer}>
          <StepIndicator
            renderStepIndicator={({ position }) => {
              if (position == 1) {
                return (
                  <Entypo
                    name="cross"
                    size={responsiveFontSize(30)}
                    color="white"
                  />
                );
              } else if (position == 2) {
                return (
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      color: 'white',
                      fontSize: responsiveFontSize(22),
                    }}
                  >
                    3
                  </Text>
                );
              } else if (position == 0) {
                return (
                  <View>
                    <Feather
                      name="check"
                      size={responsiveFontSize(20)}
                      color="white"
                    />
                  </View>
                );
              }
            }}
            stepCount={3}
            currentPosition={1}
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
            <Entypo
              name="circle-with-cross"
              size={responsiveFontSize(150)}
              color="red"
            />
            <Text style={styles.title1}>Payment is Unsuccessful</Text>
            <Text style={styles.title2}>
              No money has been deducted from your account.
            </Text>
            <Text style={[styles.title2, { marginTop: heightToDp(2) }]}>
              Please retry the payment process to secure your COVID test slot.
            </Text>
          </View>
          <View style={styles.bottom2Btns}>
            <ButtonComponent
              bg="white"
              color="red"
              onPress={() => {
                goBack();
              }}
              title={'Retry Payment'}
            />
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

export default PaymentFailed;
