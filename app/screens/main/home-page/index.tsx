/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  View,
  Platform,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';

import fonts from 'assets/fonts';
import MyImage from 'assets/images';

import {
  BookingBtn,
  // Covid19Btn,
  SmallButton,
  YourHealthBtn,
} from 'components/button';
import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import HealthSnapshot from './health-snapshot/index';

import FloatingActionButton from 'components/floating-action-button';

import { getReduxBootstrap } from 'store/account/account-actions';
import {
  getReduxMedicalDropDown,
  getReduxDashboard,
  getReduxHealthTracker,
  getReduxPspModules,
} from 'store/home/home-actions';
import { getReduxMedicationList } from 'store/home/home-actions';
import SCREENS from 'navigation/constants/index';

import AuthContext from 'utils/auth-context';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';
import { profileServices } from 'services/profile-services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userService } from 'services/user-service/user-service';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigate } from 'services/nav-ref';
import { useIsFocused } from '@react-navigation/native';
import { getAllApointmentsCountsR } from 'store/notifications/notification-actions';
import { IAppState } from 'store/IAppState';
import { addCovidBooking } from 'store/covid/covid-actions';
import {
  setConnectedDevices,
  setDeviceChanged,
} from 'store/tryvital/tryvital-actions';
import { TryvitalsService } from 'services/tryvitals-service/tryvitals-service';

export default function Home() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const focused = useIsFocused();
  const authContext = useContext(AuthContext);

  // const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);
  const dispatch = useDispatch();
  const dispatchMedDropDown = useDispatch();
  const dispatchMedicationList = useDispatch();
  const dashboard = useSelector((state: IAppState) => state.home.dashboard);
  const deviceChanged = useSelector(
    (state: IAppState) => state.tryvital.deviceChanged
  );
  /*eslint-disable*/
  const getReduxBoot = async () => {
    await dispatch(getReduxBootstrap());
  };
  const getMedicalDropDown = async () => {
    await dispatchMedDropDown(getReduxMedicalDropDown());
  };
  const getMedicationList = async () => {
    await dispatchMedicationList(getReduxMedicationList());
  };

  useEffect(() => {
    if (
      dashboard?.psp_user &&
      [2, 4].includes(dashboard?.program_detail?.program_id)
    ) {
      navigate(SCREENS.DIABETES_CENTER);
    } else if (
      dashboard?.psp_user &&
      [3, 4].includes(dashboard?.program_detail?.program_id)
    ) {
      navigate(SCREENS.HYPERTENSION);
    }
  }, [dashboard?.psp_user]);

  useEffect(() => {
    dispatch(getReduxHealthTracker());
    dispatch(getReduxDashboard());
    dispatch(getReduxPspModules());
  }, []);

  useEffect(() => {
    getReduxBoot();
    getMedicalDropDown();
    getMedicationList();
  }, []);

  const getAppointsmentsCounts = async () => {
    await dispatch(getAllApointmentsCountsR());
  };

  useEffect(() => {
    getAppointsmentsCounts();
  }, [focused]);
  /*eslint-enable*/
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    registerDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const registerDevice = async () => {
    let fcm = await AsyncStorage.getItem('fcm');
    let temp = await userService.deviceRegisterAction(fcm, Platform.OS);
    console.log('tem', temp);
  };
  const userProfile = async () => {
    try {
      const result = await profileServices.getUserProfile();
      authContext.setUserData(result);
      i18next.changeLanguage(result?.app_lang);
      await TryvitalsService.connectedDevices().then((response) =>
        dispatch(setConnectedDevices(response))
      );
      dispatch(setDeviceChanged(false));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceChanged]);

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <View style={styles.navBar}>
        <Text style={styles.navHeading}>
          {t('pages.dashboard.greetings')} {authContext?.userData?.first_name}
        </Text>
        <View style={styles.navSearch}>
          <SearchBarWithLeftScanIcon />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: -3,
          height: Dimensions.get('window').height,
        }}
      >
        <ScrollView>
          <View style={styles.midContainer}>
            <View style={styles.bookNowC}>
              <ImageBackground
                source={MyImage.rectangle}
                style={{
                  width: '100%',
                  height: 140,
                }}
              >
                <Text style={styles.bnHeading}>
                  {t('pages.covid-booking.homeTitle')}
                </Text>
                <View style={styles.bnInner}>
                  <View style={{ width: '65%' }}>
                    <Text
                      style={{
                        fontFamily: fonts.mulishRegular,
                        fontSize: RFValue(13),
                        color: 'white',
                        lineHeight: 16.32,
                        paddingTop: 3,
                      }}
                    >
                      {t('pages.covid-booking.homeDescription')}
                    </Text>
                  </View>
                  <View>
                    <SmallButton
                      title="Book Now"
                      onPress={() => {
                        console.log(
                          'userDee',
                          authContext?.userData?.id_verification
                        );

                        if (
                          authContext?.userData?.id_verification == 'PENDING' ||
                          authContext?.userData?.id_verification == 'SUCCESS'
                        ) {
                          navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                            screen: SCREENS.BOOKCOVIDTEST,
                          });
                        } else {
                          navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
                            screen: SCREENS.ID_VERIFICATION_START,
                            params: { sendTo: 'booktest' },
                          });
                        }

                        dispatch(addCovidBooking([]));
                      }}
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.badgesContainer}>
              <YourHealthBtn />
              <BookingBtn />
              {/* <Covid19Btn /> */}
            </View>
            <HealthSnapshot
              device_connected={authContext?.userData?.connected_device}
            />
            <View style={{ paddingBottom: '50%' }} />
          </View>
        </ScrollView>
      </View>
      <FloatingActionButton />
    </View>
  );
}
