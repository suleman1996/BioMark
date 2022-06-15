import React, { useEffect } from 'react';

import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
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
import fonts from 'assets/fonts';
import { IAppState } from 'store/IAppState';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from 'services/user-service/user-service';
import { addUserContactsDetails } from 'store/auth/auth-actions';
import { BookTestBooking } from 'types/api';
import { dateFormat1, getTime } from 'utils/functions/date-format';

type Props = {};

const labels = ['Booking', 'Payment', 'Confirmation'];

const PaymentStep = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const styles = makeStyles(colors);
  const booking = useSelector((state: IAppState) => state.covid.booking);
  const userContacts = useSelector(
    (state: IAppState) => state.auth.userContacts
  );
  const dependants = useSelector(
    (state: IAppState) => state.account.allDependents
  );
  /*eslint-disable */
  useEffect(() => {
    userService
      .getUserContacts()
      .then((res) => {
        dispatch(addUserContactsDetails(res));
      })
      .catch(() => {})
      .finally(() => {});
  }, []);
  /*eslint-enable */

  const SingleCardForPayment = ({ item }: { item: BookTestBooking }) => {
    const nName = dependants.find(
      (item2) => item2.id == item.dependent_id
    )?.name;
    const {
      name = '',
      confirmationDate = new Date(),
      currency = '',
      amount = 0,
    } = {
      name: item.is_dependant ? nName : 'You',
      confirmationDate: item.confirmation_date,
      currency: 'SGD',
      amount: item.amount,
    };
    return (
      <View style={styles.innerView}>
        <Text
          style={{
            fontFamily: GlobalFonts.bold,
            color: colors.darkPrimary,
            fontSize: responsiveFontSize(20),
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontFamily: GlobalFonts.medium,
            color: colors.black,
            fontSize: responsiveFontSize(20),
          }}
        >
          {`${item.test_location} at ${item.test_centre_name}`}
        </Text>
        <Text
          style={{
            fontFamily: GlobalFonts.regular,
            color: colors.smoke,
            fontSize: responsiveFontSize(18),
          }}
        >
          {`${item.test_country_name}, ${item.test_city_name}`}
        </Text>
        <Text
          style={{
            fontFamily: GlobalFonts.regular,
            color: colors.smoke,
            fontSize: responsiveFontSize(18),
          }}
        >
          {`${item.test_centre_name}`}
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
              {dateFormat1(confirmationDate.toString())}
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
              {getTime(confirmationDate.toString())}
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
            {`${currency} ${amount}`}
          </Text>
        </Text>
      </View>
    );
  };

  const { totalPrice = 0 } = {
    totalPrice: booking.reduce(function (acc, obj) {
      return acc + obj?.amount;
    }, 0),
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.stepContainer}>
          <StepIndicator
            renderStepIndicator={({ position }) => {
              if (position == 1) {
                return (
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      color: 'white',
                      fontSize: responsiveFontSize(22),
                    }}
                  >
                    2
                  </Text>
                );
              } else {
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
            <Text style={styles.innerTitle}>Your Test Order</Text>
            <FlatList renderItem={SingleCardForPayment} data={booking} />
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
                SGD {totalPrice}
              </Text>
            </View>
            <View
              style={[styles.headerLine, { marginBottom: heightToDp(1) }]}
            />
            <InputWithLabel
              labelFontSize={18}
              label={'Email address'}
              placeholder={'Enter your email address'}
              value={userContacts.email_address}
              onFocus={() => undefined}
              onChange={undefined}
              defaultValue={undefined}
            />
            <Text style={[styles.innerTitle, { marginTop: heightToDp(1) }]}>
              Choose Payment Method
            </Text>
            <ButtonComponent
              onPress={undefined}
              title={'Debit/Credit Card Payment'}
            />
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
