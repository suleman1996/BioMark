import React, { useEffect, useState } from 'react';

import SCREENS from 'navigation/constants';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { InputWithLabel } from 'components/base';
import ButtonComponent from 'components/base/button';

import StepIndicator from 'react-native-step-indicator';
import Feather from 'react-native-vector-icons/Feather';

import fonts from 'assets/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'services/nav-ref';
import { paymentService } from 'services/payments';
import { userService } from 'services/user-service/user-service';
import { addUserContactsDetails } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';
import { getUserProfileData } from 'store/profile/profile-actions';
import { BookTestBooking } from 'types/api';
import { dateFormat1, getTime } from 'utils/functions/date-format';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { makeStyles } from './styles';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';

type Props = {};

const labels = ['Booking', 'Payment', 'Confirmation'];

const PaymentStep = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const styles = makeStyles(colors);
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const booking = useSelector((state: IAppState) => state.covid.booking);
  const userContacts = useSelector(
    (state: IAppState) => state.auth.userContacts
  );
  const dependants = useSelector(
    (state: IAppState) => state.account.allDependents
  );
  const userDetails = useSelector(
    (state: IAppState) => state.profile?.userProfile
  );
  /*eslint-disable */
  const getUserOnFocus = async () => {
    await dispatch(getUserProfileData());
  };
  useEffect(() => {
    getUserOnFocus();
    userService
      .getUserContacts()
      .then((res) => {
        dispatch(addUserContactsDetails(res));
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

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
      currency: item.currency,
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

  const {
    totalPrice = 0,
    currency = '',
    countryName = '',
    email = '',
    name = '',
  } = {
    totalPrice: booking.reduce(function (acc, obj) {
      return acc + obj?.amount;
    }, 0),
    currency: booking[0].currency,
    countryName: booking[0]?.test_country_name,
    email: userContacts.email_address,
    name: userDetails.patient_name,
  };

  console.log({ countryName: booking });

  const makeItems = () => {
    let items = booking.map((e) => {
      return {
        item_name: e.test_type_id,
        amount: e.amount,
        quantity: 1,
        currency: 'sgd',
      };
    });
    logNow(items);
  };

  useEffect(() => {
    makeItems();
  }, []);

  /*eslint-enable */

  return (
    <>
      <View style={styles.container}>
        <Modal
          deviceWidth={widthToDp(100)}
          deviceHeight={heightToDp(100)}
          onBackdropPress={() => setPaymentModal(false)}
          isVisible={paymentModal}
        >
          <WebView
            source={{ uri: paymentUrl }}
            onMessage={() => {
              // alert(event.nativeEvent.data);
            }}
            onNavigationStateChange={(webViewState) => {
              //  console.log('state changed', webViewState.url);
              if (
                webViewState.url.includes('/payment/v1/billplz/confirmation')
              ) {
                paymentService.saveDataAfterPayment(booking, email);
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.PAYMENT_SUCCESS,
                });
              } else if (
                webViewState.url.includes('/payment/v1/stripe/success')
              ) {
                paymentService.saveDataAfterPayment(booking, email);
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.PAYMENT_SUCCESS,
                });
              } else if (
                webViewState.url.includes('payment/v1/stripe/cancel')
              ) {
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.PAYMENT_FAILED,
                });
              }
            }}
          />
        </Modal>
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
                {currency} {totalPrice}
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
            {countryName === 'Malaysia' ? (
              <ButtonComponent onPress={async () => {}} title={'Online'} />
            ) : countryName == 'Singapore' ? (
              <ButtonComponent
                onPress={async () => {}}
                title={'Debit/Credit Card Payment'}
              />
            ) : null}
          </View>
          <View style={styles.bottom2Btns}>
            <Pressable style={[styles.btn, { backgroundColor: colors.white }]}>
              <Text style={[styles.btnText]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={async () => {
                if (countryName == 'Malaysia') {
                  const data: any = await paymentService.openBillPlzBrowser(
                    email,
                    name,
                    totalPrice,
                    booking
                  );
                  console.log({ data });
                  setPaymentUrl(data.url);
                  setPaymentModal(true);
                } else if (countryName == 'Singapore') {
                  const data: any = await paymentService.openStripeBrowser(
                    booking,
                    email
                  );
                  console.log({ data });
                  setPaymentUrl(data.url);
                  setPaymentModal(true);
                }
              }}
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
