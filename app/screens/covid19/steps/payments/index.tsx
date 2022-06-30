import React, { useEffect, useState } from 'react';

import SCREENS from 'navigation/constants';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { InputWithLabel } from 'components/base';
import ButtonComponent from 'components/base/button';

import StepIndicator from 'react-native-step-indicator';
import Feather from 'react-native-vector-icons/Feather';

import fonts from 'assets/fonts';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'services/nav-ref';
import { paymentService } from 'services/payments';
import { userService } from 'services/user-service/user-service';
import { addUserContactsDetails } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';
import { BookTestBooking } from 'types/api';
import { dateFormat1, getTime } from 'utils/functions/date-format';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { makeStyles } from './styles';
import { ActivityIndicator } from 'components/';

type Props = {};

const labels = ['Booking', 'Payment', 'Confirmation'];

const PaymentStep = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const styles = makeStyles(colors);

  const [isLoading, setIsLoading] = useState(false);

  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const booking = useSelector((state: IAppState) => state.covid.booking);
  // const userContacts = useSelector(
  //   (state: IAppState) => state.auth.userContacts
  // );
  const dependants = useSelector(
    (state: IAppState) => state.account.allDependents
  );
  const userDetails = useSelector(
    (state: IAppState) => state.profile?.userProfile
  );

  /*eslint-disable */

  useEffect(() => {
    userService
      .getUserContacts()
      .then((res) => {
        setEmailAddress(res.email_address);
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
    email: emailAddress,
    name: userDetails.patient_name,
  };

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

  const ifPaymentSuccessRunIt = async () => {
    await paymentService.saveDataAfterPayment(booking, email);
  };

  useEffect(() => {
    if (isPaymentSuccess) {
      ifPaymentSuccessRunIt();
    }
  }, [isPaymentSuccess]);

  /*eslint-enable */

  return (
    <>
      <ActivityIndicator visible={isLoading} />
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
            onNavigationStateChange={async (webViewState) => {
              if (
                webViewState.url.includes('/payment/v1/billplz/confirmation')
              ) {
                setIsLoading(false);
                setIsPaymentSuccess(true);
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.PAYMENT_SUCCESS,
                });
              } else if (
                webViewState.url.includes('/payment/v1/stripe/success')
              ) {
                setIsLoading(false);
                setIsPaymentSuccess(true);
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.PAYMENT_SUCCESS,
                });
              } else if (
                webViewState.url.includes('payment/v1/stripe/cancel')
              ) {
                setIsLoading(false);
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.PAYMENT_FAILED,
                });
              } else {
                setIsLoading(false);
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
              value={emailAddress}
              onFocus={() => undefined}
              onChange={setEmailAddress}
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
                setPaymentModal(false);
                if (countryName == 'Malaysia') {
                  setIsLoading(true);
                  const data: any = await paymentService.openBillPlzBrowser(
                    email,
                    name,
                    totalPrice,
                    booking
                  );

                  if (data.url) {
                    setPaymentUrl(data.url);
                    setPaymentModal(true);
                  }
                } else {
                  setIsLoading(true);
                  const data: any = await paymentService.openStripeBrowser(
                    booking,
                    email
                  );
                  if (data.url) {
                    setPaymentUrl(data.url);
                    setPaymentModal(true);
                  }
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
