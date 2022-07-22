import ExpandableView from '@pietile-native-kit/expandable-view';
import { DropdownMenu } from 'components/base';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from '../../../utils/functions/responsive-text';
import CircleBtn from '../../button/circleBtn';
import CalenderStrip from '../../higher-order/calender-strip/index';
import TimeSlots from '../time-slots/index';
import { makeStyles } from './styles';
type Props = {};

const options = [
  { value: '---', label: '---' },
  { value: 'Caucasian', label: 'Caucasian' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Filpino', label: 'Filpino' },
  { value: 'Indian', label: 'Indian' },
  { value: 'Malay', label: 'Malay' },
  { value: 'Other / NA', label: 'Other / NA' },
];

const CovidTestBookForPersonal = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [show, setShow] = useState(true);

  const [countryDropdownValue, setCountryDropDown] = useState<any>();
  const [cityDropdownValue, setCityDropDown] = useState<any>();
  const [covidTestCenterValue, setCovidTestCenter] = useState<any>();
  const [testCenterValue, setTestCenter] = useState<any>();

  function onPress() {
    setShow(!show);
  }

  return (
    <View style={styles.parent}>
      <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.titleText}>You</Text>
        <View style={styles.bookingStatusContainer}>
          <Text style={styles.statusText}>Not Booked Yet</Text>
          <Entypo
            size={responsiveFontSize(30)}
            name={show ? 'chevron-small-down' : 'chevron-small-right'}
          />
        </View>
      </Pressable>
      {show ? <View style={styles.headerLine} /> : null}
      <ExpandableView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        show={show}
      >
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
          <View style={styles.expendedContainer}>
            <Text style={styles.innerTitle}>
              Where would you like to get tested?
            </Text>
            <View style={styles.getTestedContainer}>
              <View style={styles.btnContainer}>
                <CircleBtn
                  icon={
                    <Entypo
                      size={responsiveFontSize(50)}
                      name="squared-plus"
                      color={colors.white}
                    />
                  }
                />
                <Text style={styles.innerTitle}>Test Center</Text>
              </View>
              <View style={styles.btnContainer}>
                <CircleBtn
                  disabled={true}
                  icon={
                    <Entypo
                      size={responsiveFontSize(50)}
                      name="home"
                      color={colors.darkGray}
                    />
                  }
                />
                <Text style={styles.innerTitle}>Home Test</Text>
                <Text style={styles.innerSmallTxt}>Coming soon</Text>
              </View>
            </View>
            <Text style={styles.innerTitle}>Country</Text>
            <View style={{ position: 'relative' }}>
              <DropdownMenu
                options={options}
                selectedValue={countryDropdownValue}
                onValueChange={(value: any) => {
                  setCountryDropDown(value);
                }}
              />
              <View style={{ marginTop: heightToDp(1) }} />
              {/* City Select */}
              {countryDropdownValue ? (
                <>
                  <Text style={styles.innerTitle}>City</Text>
                  <DropdownMenu
                    options={options}
                    selectedValue={cityDropdownValue}
                    onValueChange={(value: any) => {
                      setCityDropDown(value);
                    }}
                  />
                </>
              ) : null}

              {/* Select Test Center */}
              <View style={{ marginTop: heightToDp(1) }} />
              {cityDropdownValue ? (
                <>
                  <Text style={styles.innerTitle}>Select a covid Test</Text>
                  <DropdownMenu
                    options={options}
                    selectedValue={covidTestCenterValue}
                    onValueChange={(value: any) => {
                      setCovidTestCenter(value);
                    }}
                  />
                </>
              ) : null}
              <View style={{ marginTop: heightToDp(1) }} />
              {covidTestCenterValue ? (
                <>
                  <Text style={styles.innerTitle}>Select a covid Test</Text>
                  <DropdownMenu
                    options={options}
                    selectedValue={testCenterValue}
                    onValueChange={(value: any) => {
                      setTestCenter(value);
                    }}
                  />
                </>
              ) : null}
            </View>
            {true ? (
              <>
                <Text style={styles.innerTitle}>City Test Centers</Text>
                <MapView
                  showsUserLocation={false}
                  style={{ width: widthToDp(88), height: heightToDp(20) }}
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}
                >
                  <Marker
                    key={0}
                    coordinate={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                    }}
                    title={'My ttile'}
                  >
                    <View
                      style={{
                        width: widthToDp(15),
                        height: heightToDp(3),
                        backgroundColor: 'white',
                        borderWidth: 0.2,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: GlobalFonts.medium,
                          color: colors.primary,
                        }}
                      >
                        RM 143
                      </Text>
                    </View>
                  </Marker>
                </MapView>
              </>
            ) : null}
            <Text style={styles.innerTitle}>Choose a test date</Text>
            <CalenderStrip />
            <View style={{ marginTop: heightToDp(1) }} />

            {/* shift chooser */}
            <Text style={styles.innerTitle}>Morning timeslots</Text>
            <TimeSlots />
            <View style={styles.bottomBtnContainer}>
              <View
                style={[styles.bottomBtn, { backgroundColor: colors.white }]}
              >
                <Text style={styles.bottomBtnText}>Remove</Text>
              </View>
              <View style={styles.bottomBtn}>
                <Text style={[styles.bottomBtnText, { color: colors.white }]}>
                  Done
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ExpandableView>
    </View>
  );
};

export default CovidTestBookForPersonal;
