import fonts from 'assets/fonts';
import MyImage from 'assets/images';
import {
  Covid19Btn,
  GoogleFitButton,
  SmallButton,
  YourHealthBtn,
} from 'components/button';
import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import React, { useContext, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { userService } from 'services/user-service/user-service';
import { getReduxBootstrap } from 'store/account/account-actions';
import AuthContext from 'utils/auth-context';
import styles from './styles';

export default function Home() {
  const authContext = useContext(AuthContext);

  // const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);
  const dispatch = useDispatch();

  /*eslint-disable*/
  const getReduxBoot = async () => {
    await dispatch(getReduxBootstrap());
  };

  useEffect(() => {
    getReduxBoot();
  }, []);
  /*eslint-enable*/

  const userProfile = async () => {
    try {
      const result = await userService.getUserProfile();
      console.log('Here is the user profile ', result.data);
      authContext.setUserData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ alignSelf: 'center', backgroundColor: 'white' }}>
      <View style={styles.navBar}>
        <Text style={styles.navHeading}>
          Hello {authContext?.userData?.first_name}!
        </Text>
        <View style={styles.navSearch}>
          <SearchBarWithLeftScanIcon />
        </View>
      </View>
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
              <Text style={styles.bnHeading}>Book your COVID-19 Test</Text>
              <View style={styles.bnInner}>
                <View style={{ width: '60%' }}>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      fontSize: 13,
                      color: 'white',
                      lineHeight: 16.36,
                      paddingTop: 3,
                    }}
                  >
                    Planning a COVID-19 Test for you and your Dependant? Place
                    an appiontment with us by clicking "Book Now"
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
          <Text style={styles.gfHeading}>Your Health Snapshot</Text>
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
                  title="Connect with Google Fit"
                  onPress={() => console.log('pressed')}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
