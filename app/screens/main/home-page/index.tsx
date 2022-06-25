import React, { useContext, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { useDispatch } from 'react-redux';

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

import { homeServices } from 'services/home-service/index';
import { getReduxBootstrap } from 'store/account/account-actions';
import { getReduxMedicalDropDown } from 'store/home/home-actions';
import { getReduxMedicationList } from 'store/home/home-actions';

import AuthContext from 'utils/auth-context';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';

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

  const userProfile = async () => {
    try {
      const result = await homeServices.getUserProfile();
      authContext.setUserData(result);
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
                        fontSize: 13,
                        color: 'white',
                        lineHeight: 16.36,
                        paddingTop: 3,
                      }}
                    >
                      {t('pages.covid-booking.homeDescription')}
                    </Text>
                  </View>
                  <View style={{ width: '35%' }}>
                    <SmallButton title="Book Now" />
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
                    title={t('healthSnapshot.android.connectButton')}
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
