import React from 'react';

import { Pressable, ScrollView, Text, View } from 'react-native';
import SCREENS from 'navigation/constants';
import { useTheme } from 'react-native-paper';

import ButtonComponent from 'components/base/button';
import { InputWithLabel } from 'components/base';

import StepIndicator from 'react-native-step-indicator';
import Feather from 'react-native-vector-icons/Feather';

import { navigate } from 'services/nav-ref';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { makeStyles } from './styles';

type Props = {};

const labels = ['Booking', 'Payment', 'Confirmation'];

const PaymentStep = (props: Props) => {
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
            <Text style={styles.innerTitle}>Your Test Order</Text>
            <View style={styles.innerView}>
              <Text
                style={{
                  fontFamily: GlobalFonts.bold,
                  color: colors.darkPrimary,
                  fontSize: responsiveFontSize(20),
                }}
              >
                Deku Midoriya
              </Text>
              <Text
                style={{
                  fontFamily: GlobalFonts.medium,
                  color: colors.black,
                  fontSize: responsiveFontSize(20),
                }}
              >
                COVID-19 PCR (Saliva) at PW TEST
              </Text>
              <Text
                style={{
                  fontFamily: GlobalFonts.regular,
                  color: colors.smoke,
                  fontSize: responsiveFontSize(18),
                }}
              >
                Malaysia, Terengganu
              </Text>
              <Text
                style={{
                  fontFamily: GlobalFonts.regular,
                  color: colors.smoke,
                  fontSize: responsiveFontSize(18),
                }}
              >
                PW TEST
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: heightToDp(1),
                }}
              >
                <Text
                  style={{
                    fontFamily: GlobalFonts.medium,
                    color: colors.black,
                    fontSize: responsiveFontSize(20),
                  }}
                >
                  TEST Date{' '}
                  <Text
                    style={{
                      fontFamily: GlobalFonts.light,
                      color: colors.smoke,
                      fontSize: responsiveFontSize(20),
                    }}
                  >
                    24/5/22
                  </Text>
                </Text>
                <Text
                  style={{
                    fontFamily: GlobalFonts.medium,
                    color: colors.black,
                    fontSize: responsiveFontSize(20),
                  }}
                >
                  Time Slot{' '}
                  <Text
                    style={{
                      fontFamily: GlobalFonts.light,
                      color: colors.smoke,
                      fontSize: responsiveFontSize(20),
                    }}
                  >
                    9:30 AM
                  </Text>
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: GlobalFonts.medium,
                  color: colors.black,
                  fontSize: responsiveFontSize(20),
                  textAlign: 'right',
                }}
              >
                Test Price:{' '}
                <Text
                  style={{
                    fontFamily: GlobalFonts.bold,
                    color: colors.lightGreen,
                    fontSize: responsiveFontSize(35),
                    textAlign: 'right',
                  }}
                >
                  RM 143
                </Text>
              </Text>
            </View>
            <View style={[styles.headerLine, { marginTop: heightToDp(1) }]} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontFamily: GlobalFonts.medium,
                  color: colors.darkPrimary,
                  fontSize: responsiveFontSize(25),
                  textAlign: 'right',
                }}
              >
                Total Payment Due
              </Text>
              <Text
                style={{
                  fontFamily: GlobalFonts.bold,
                  color: colors.lightGreen,
                  fontSize: responsiveFontSize(25),
                  textAlign: 'right',
                }}
              >
                RM 143
              </Text>
            </View>
            <View
              style={[styles.headerLine, { marginBottom: heightToDp(1) }]}
            />
            <InputWithLabel
              labelFontSize={18}
              label={'Email address'}
              placeholder={'Enter your email address'}
              value={'junaid.younas@sprintx.net'}
              onFocus={() => undefined}
              onChange={undefined}
              defaultValue={undefined}
            />
            <Text style={[styles.innerTitle, { marginTop: heightToDp(1) }]}>
              Choose Payment Method
            </Text>
            <ButtonComponent onPress={undefined} title={'Online Payment'} />
          </View>
          <View style={styles.bottom2Btns}>
            <Pressable style={[styles.btn, { backgroundColor: colors.white }]}>
              <Text style={[styles.btnText]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.PAYMENT_SUCCESS,
                })
              }
              style={styles.btnEnable}
            >
              <Text style={[styles.btnText2]}>Next</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PaymentStep;
