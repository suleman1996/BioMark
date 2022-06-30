/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import i18next from 'i18next';

import fonts from 'assets/fonts';
import MyImage from 'assets/images';
import {
  Covid19Btn,
  GoogleFitButton,
  SmallButton,
  YourHealthBtn,
} from 'components/button';
import { SearchBarWithLeftScanIcon } from 'components/higher-order';

import FloatingActionButton from 'components/floating-action-button';

import { getReduxBootstrap } from 'store/account/account-actions';
import { getReduxMedicalDropDown } from 'store/home/home-actions';
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

export default function Home() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const authContext = useContext(AuthContext);

  // const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);
  const dispatch = useDispatch();
  const dispatchMedDropDown = useDispatch();
  const dispatchMedicationList = useDispatch();

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
    getReduxBoot();
    getMedicalDropDown();
    getMedicationList();
  }, []);
  /*eslint-enable*/
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let fcm = await AsyncStorage.getItem('fcm');
    registerDevice(fcm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const registerDevice = async (fcm) => {
    await userService.deviceRegisterAction(fcm, Platform.OS);
  };
  const userProfile = async () => {
    try {
      const result = await profileServices.getUserProfile();
      console.log('result', result);

      authContext.setUserData(result);
      i18next.changeLanguage(result?.app_lang);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <View style={styles.navBar}>
        <Text style={styles.navHeading}>
          {t('pages.dashboard.greetings')} {authContext?.userData?.first_name}!
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
                  <View style={{ width: '60%' }}>
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
                        navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                          screen: SCREENS.BOOKCOVIDTEST,
                        });
                      }}
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.badgesContainer}>
              <YourHealthBtn />
              <Covid19Btn />
            </View>
            <Text style={styles.gfHeading}>{t('healthSnapshot.title')}</Text>
            <View style={styles.googleFitC}>
              <ImageBackground
                source={MyImage.healthRing}
                style={{
                  height: '100%',
                  width: '100%',
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity>
                  <GoogleFitButton
                    disabled={false}
                    title={
                      Platform.OS == 'android'
                        ? t('healthSnapshot.android.connectButton')
                        : t('healthSnapshot.ios.connectButton')
                    }
                    onPress={() => console.log('pressed')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        </ScrollView>
      </View>
      <FloatingActionButton />
    </View>
  );
}
