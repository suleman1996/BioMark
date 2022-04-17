import React from 'react';
import {
  ImageBackground, ScrollView, Text, TouchableOpacity, View
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
    <>
      <View style={styles.navBar}>
        <Text style={styles.navHeading}>Hello Calvin!</Text>
        <View style={styles.navSearch}>
          {/* <View style={styles.navSearchInner}>
            <TouchableOpacity>
              <QrScanner />
            </TouchableOpacity>
            <SearchBar />
          </View> */}
          <SearchBarWithLeftScanIcon />
        </View>
      </View>
      <ScrollView>
        <View style={styles.midContainer}>
          <View style={styles.bookNowC}>
            <ImageBackground
              source={MyImage.rectangle}
              style={{
                height: 140,
                width: 370,
                paddingHorizontal: 15,
                borderRadius: 8,
              }}>
              <Text style={styles.bnHeading}>Book your COVID-19 Test</Text>
              <View style={styles.bnInner}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    color: 'white',
                    marginRight: 12,
                    lineHeight: 18,
                    paddingTop: 3,
                  }}>
                  Planning a COVID-19 Test for you and your Dependant? Place an
                  appiontment with us by clicking "Book Now"
                </Text>
                <SmallBtn title="Book Now" />
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
                height: 150,
                width: 360,
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
      <View style={styles.bottomNavBar}>{/* <BottomNav /> */}</View>
    </>
  );
}
