import React, { useEffect, useState } from 'react';

import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';

import ButtonComponent from 'components/base/button';
import ExisitingBookingForDependent from 'components/ui/covid-test-book-for-existing/index';
import SCREENS from 'navigation/constants/index';
import { navigate } from 'services/nav-ref';
import { heightToDp } from 'utils/functions/responsive-dimensions';

import TopBarWithBackText from 'components/higher-order/topBarWithBackText/index';
import CancelBookingTestModal from 'components/ui/cancelBookingTestModal/index';
import { useDispatch, useSelector } from 'react-redux';
import AddDependantForm from 'screens/main/account/dependants/add-depandant-form';
import {
  addCovidBooking,
  getCovidBookingFormR,
} from 'store/covid/covid-actions';
import { IAppState } from 'store/IAppState';
import { store } from 'store/store';
import { logNow } from 'utils/functions/log-binder';
import makeStyles from './styles';
import { useIsFocused } from '@react-navigation/native';
import { getAllDependents } from 'store/account/account-actions';
import ICMissingModal from 'components/ui/ic-missing-modal';
import { t } from 'i18next';

type Props = {};

const labels = ['Booking', 'Payment', 'Confirmation'];

const BookCovidTest = (props: Props) => {
  const {} = props;

  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [isDependantAdd, setIsDependantAdd] = useState(false);

  const [isCancelModal, setIsCancelModal] = useState(false);

  const [isICModal, setIsICModal] = useState(false);

  /*eslint-disable */
  const dependants = useSelector(
    (state: IAppState) => state.account.allDependents
  );
  useEffect(() => {
    dispatch(getAllDependents());
    dispatch(getCovidBookingFormR());
  }, [focused]);
  /*eslint-enable */

  // booking array is
  const booking = useSelector((state: IAppState) => state.covid.booking);
  const bookingFormData = useSelector(
    (state: IAppState) => state.covid.bookingForm
  );
  const bookState = useSelector((state: IAppState) => state.covid);
  useEffect(() => {
    logNow('Changed');
  }, [bookState.booking]);

  const [openedBooking, setOpendedBooking] = useState(-1);
  // push if dependants
  const pushOneMoreToBooking = async () => {
    let copyArray = booking;
    copyArray.push({ is_dependant: true });
    store.dispatch(addCovidBooking(copyArray));
  };

  const pushOneAddSelf = async () => {
    let copyArray = booking;
    copyArray.push({ is_dependant: false, dependent_id: 0 });
    store.dispatch(addCovidBooking(copyArray));
  };

  const ifNextDisabled =
    booking.length > 0 && booking.every((item) => item.booking_status === 0)
      ? {}
      : { backgroundColor: colors.inputBg };

  return (
    <>
      <View style={styles.container}>
        <CancelBookingTestModal
          setIsVisible={setIsCancelModal}
          isVisible={isCancelModal}
        />
        <ICMissingModal setIsVisible={setIsICModal} isVisible={isICModal} />
        <View style={styles.stepContainer}>
          <TopBarWithBackText
            onBackPress={() => {
              setIsCancelModal(true);
            }}
          />
          <StepIndicator
            stepCount={3}
            currentPosition={0}
            customStyles={styles.stepIndicator}
            labels={labels}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scrollView}
        >
          {/* {isExistingBtn && !isDependantAdd ? ( */}
          {[...booking].map((item, index) => {
            return (
              <View key={index}>
                <ExisitingBookingForDependent
                  setOpendedBooking={setOpendedBooking}
                  openedBooking={openedBooking}
                  itemIndex={index}
                />
              </View>
            );
          })}

          {/* ) : null} */}

          {dependants.every(
            (item) =>
              item.id ==
              booking.find((item2) => item2.dependent_id == item.id)
                ?.dependent_id
          )
            ? null
            : dependants.length > 0 && (
                <ButtonComponent
                  onPress={() => {
                    // setIsExisting(true);
                    pushOneMoreToBooking();
                    setOpendedBooking(0);
                  }}
                  title={t('pages.covid.covid-button.exist')}
                />
              )}

          <ButtonComponent
            onPress={() => {
              setIsDependantAdd(true);
            }}
            marginTop={1}
            disabled={isDependantAdd}
            title={t('pages.covid.covid-button.add')}
          />
          {!isDependantAdd ? null : (
            <ButtonComponent
              disabled={isDependantAdd}
              onPress={() => {
                // setIsExisting(true);
                pushOneAddSelf();
              }}
              marginTop={1}
              title={'Add Self'}
            />
          )}
          {/* Add Dependant Form */}
          {isDependantAdd ? (
            <AddDependantForm
              callMe={() => {
                setIsDependantAdd(false);
              }}
            />
          ) : null}
          {isDependantAdd ||
          booking.some((item) => item.is_dependant == false) ? null : (
            <ButtonComponent
              disabled={isDependantAdd}
              onPress={() => {
                if (bookingFormData.has_user_ic) {
                  pushOneAddSelf();
                } else {
                  setIsICModal(true);
                }
                // setIsExisting(true);
              }}
              marginTop={1}
              title={t('pages.covid.covid-button.addSelf')}
            />
          )}
          <View style={{ marginTop: heightToDp(12) }} />
          <View style={styles.bottom2Btns}>
            <Pressable
              style={[styles.btn, { backgroundColor: colors.white }]}
              onPress={() => {
                setIsCancelModal(true);
              }}
            >
              <Text style={[styles.btnText]}>
                {t('pages.covid.bookCovid.cancel')}
              </Text>
            </Pressable>
            <Pressable
              disabled={booking.every((item) => item?.booking_status !== 0)}
              onPress={() => {
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.PAYMENT_STEP,
                });
              }}
              style={[styles.btnEnable, ifNextDisabled]}
            >
              <Text style={[styles.btnText2]}>
                {' '}
                {t('pages.covid.bookCovid.next')}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default BookCovidTest;
