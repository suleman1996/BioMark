import React from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import fonts from '../../../assets/fonts/fonts';
import MyImage from '../../../assets/images/images';
import Covid19Btn from '../../../components/button/covid19';
import GoogleFit from '../../../components/button/googleFit';
import SmallBtn from '../../../components/button/small-button';
import YourHealthBtn from '../../../components/button/yourHealthBtn';
import SearchBarWithLeftScanIcon from '../../../components/higher-order/searchBarWithLeftScanIcon';
// import BottomBar from '../../../components/bottom-nav/bottom-bar';
import styles from './styles';

export default function Home() {
  return (
    <View style={{alignSelf: 'center', backgroundColor: 'white'}}>
      <View style={styles.navBar}>
        <Text style={styles.navHeading}>Hello Calvin!</Text>
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
                // paddingHorizontal: 15,
                // borderRadius: 18,
                // paddingBottom: 5,
              }}>
              <Text style={styles.bnHeading}>Book your COVID-19 Test</Text>
              <View style={styles.bnInner}>
                <View style={{width: '60%'}}>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      fontSize: 13,
                      color: 'white',
                      lineHeight: 16.36,
                      paddingTop: 3,
                    }}>
                    Planning a COVID-19 Test for you and your Dependant? Place
                    an appiontment with us by clicking "Book Now"
                  </Text>
                </View>
                <View style={{width: '35%'}}>
                  <SmallBtn title="Book Now" />
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
              }}>
              <TouchableOpacity>
                <GoogleFit
                  disabled={false}
                  title="Connect with Google Fit"
                  // onPress={() => navigations.navigate('SignupVerification')}
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
