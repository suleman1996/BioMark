import ExpandableView from '@pietile-native-kit/expandable-view';
import { DropdownMenu } from 'components/base';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import CircleBtn from '../../button/circleBtn';
import { responsiveFontSize } from './../../../utils/functions/responsive-text';
import CalenderStrip from './../../higher-order/calender-strip/index';
import { makeStyles } from './styles';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GlobalFonts } from 'utils/theme/fonts';
import TimeSlots from './../time-slots/index';
import { IAppState } from 'store/IAppState';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDependents } from 'store/account/account-actions';
import { getCovidBookingFormR } from 'store/covid/covid-actions';
import { DependentData } from 'types/api/dependent';
import { useIsFocused } from '@react-navigation/native';
import DropdownCountryCity from 'components/base/dropdown-country-city';
import { logNow } from 'utils/functions/log-binder';

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

const ExisitingBookingForDependent = (props: Props) => {
  const {} = props;
  const { colors }: any = useTheme();
  const styles = makeStyles(colors);
  const [show, setShow] = useState(true);
  const focused = useIsFocused();

  const [countryDropdownValue, setCountryDropDown] = useState<any>();
  const [cityDropdownValue, setCityDropDown] = useState<any>();
  const [covidTestCenterValue, setCovidTestCenter] = useState<any>();
  const [testCenterValue, setTestCenter] = useState<any>();
  const dispatch = useDispatch();

  /*eslint-disable */
  const dependants = useSelector(
    (state: IAppState) => state.account.allDependents
  );
  const bookingFormData = useSelector(
    (state: IAppState) => state.covid.bookingForm
  );
  useEffect(() => {
    dispatch(getAllDependents());
    dispatch(getCovidBookingFormR());
  }, [focused]);
  /*eslint-enable*/

  // Database values for update or delete operations
  const [selectedDependant, setSelectedDependant] = useState(-1);
  const [sDName, setSDName] = useState('');

  function onPress() {
    setShow(!show);
  }

  const _renderItemForDependants = ({
    item,
  }: // index,
  {
    item: DependentData;
    // index: number;
  }) => {
    const {} = item;
    const selectedDependentBg =
      selectedDependant === item.id ? { backgroundColor: colors.primary } : {};
    const selectedDependantTxtColor =
      selectedDependant === item.id
        ? { color: colors.white }
        : { color: colors.darkPrimary };
    return (
      <Pressable
        onPress={() => {
          setSelectedDependant(item.id);
          setSDName(item.name);
        }}
        style={[styles.dependantConatiner, selectedDependentBg]}
      >
        <Text style={[styles.dName, selectedDependantTxtColor]}>
          {item.name}
        </Text>
        <View style={styles.bookingStatusContainer}>
          <Text style={[styles.dType, selectedDependantTxtColor]}>
            {item.type}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.parent}>
      <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.titleText}>{sDName ? sDName : 'Dependants'}</Text>
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
            <Text style={styles.innerTitle}>Choose a Dependent</Text>
            <FlatList renderItem={_renderItemForDependants} data={dependants} />
            <View
              style={[styles.headerLine, { marginVertical: heightToDp(2) }]}
            />
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
                <Text style={styles.innerSmallTxt}>Comming soon</Text>
              </View>
            </View>
            <Text style={styles.innerTitle}>Country</Text>
            <View style={{ position: 'relative' }}>
              <DropdownCountryCity
                options={bookingFormData.country_list.map((item) => {
                  return { value: item.id, label: item.name };
                })}
                selectedValue={countryDropdownValue}
                onValueChange={(value: any) => {
                  logNow(value);
                  setCityDropDown(undefined);
                  setCountryDropDown(value);
                }}
              />
              <View style={{ marginTop: heightToDp(1) }} />
              {/* City Select */}
              {countryDropdownValue ? (
                <>
                  <Text style={styles.innerTitle}>City</Text>
                  <DropdownCountryCity
                    options={bookingFormData.country_list
                      .filter((item2) => item2.id == countryDropdownValue)[0]
                      ?.cities.map((item3) => {
                        return { value: item3.id, label: item3.name };
                      })}
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

export default ExisitingBookingForDependent;
