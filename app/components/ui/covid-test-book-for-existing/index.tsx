import ExpandableView from '@pietile-native-kit/expandable-view';
import { useIsFocused } from '@react-navigation/native';
import { DropdownMenu } from 'components/base';
import DropdownCountryCity from 'components/base/dropdown-country-city';
import FakeDropdownUnSelectable from 'components/higher-order/fakeDropdownUnSelectable';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { covidService } from 'services/covid-service';
import { addCovidBooking } from 'store/covid/covid-actions';
import { IAppState } from 'store/IAppState';
import {
  TestCenterResponse,
  TestCentreScheduleResponse,
  TestClinic,
} from 'types/api';
import { DependentData } from 'types/api/dependent';
import { getZonedTimeDate } from 'utils/functions/date-format';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import CircleBtn from '../../button/circleBtn';
import CountryNotChangeDialog from '../country-not-changable-dialog';
import { responsiveFontSize } from './../../../utils/functions/responsive-text';
import CalenderStrip from './../../higher-order/calender-strip/index';
import TimeSlots from './../time-slots/index';
import { makeStyles } from './styles';

type Props = {
  setOpendedBooking: any;
  openedBooking: number;
  itemIndex: number;
};

// const options = [
//   { value: '---', label: '---' },
//   { value: 'Caucasian', label: 'Caucasian' },
//   { value: 'Chinese', label: 'Chinese' },
//   { value: 'Filpino', label: 'Filpino' },
//   { value: 'Indian', label: 'Indian' },
//   { value: 'Malay', label: 'Malay' },
//   { value: 'Other / NA', label: 'Other / NA' },
// ];

const ExisitingBookingForDependent = (props: Props) => {
  const booking = useSelector((state: IAppState) => state.covid.booking);
  const [isCountryDialog, setIsCountryDialog] = useState(false);

  const { setOpendedBooking, openedBooking, itemIndex } = props;
  function openAndCloseBooking(index: number) {
    logNow(openedBooking);
    if (index == openedBooking) {
      setOpendedBooking(-1);
    } else {
      setOpendedBooking(index);
    }
  }

  const { colors }: any = useTheme();
  const styles = makeStyles(colors);
  const focused = useIsFocused();

  const [morningTimeSlots, setMorningTimeSlots] = useState([]);
  const [eveningTimeSlots, setEveningTimeSlots] = useState([]);
  const [testCentersBasedOnCities, setTestCenters] = useState<
    TestCenterResponse[]
  >([]);
  const getTestCentersOnCity = (id: string) => {
    covidService.getCovidTestAndTestCenters(id).then((res: any) => {
      // logNow(res);
      setTestCenters(res);
    });
  };

  const [testCenterSchedules, setTestCentersSchedules] =
    useState<TestCentreScheduleResponse>();
  const getTestCenterSchedules = (test_center_id: number) => {
    covidService
      .getCovidTestCentersSchedules(test_center_id)
      .then((res: any) => {
        // logNow(res);
        setTestCentersSchedules(res);
      });
  };

  const [countryDropdownValue, setCountryDropDown] = useState<any>();
  const [cityDropdownValue, setCityDropDown] = useState<any>();
  const [covidTestCenterValue, setCovidTestCenter] = useState<any>();
  const [testCenterValue, setTestCenter] = useState<any>();
  const [testDate, setTestDate] = useState('');
  const [testTime, setTestTime] = useState('');
  const [testTimeFormat, setTimeFormat] = useState('');

  const dispatch = useDispatch();

  /*eslint-disable */
  const dependants = useSelector(
    (state: IAppState) => state.account.allDependents
  );
  const bookingFormData = useSelector(
    (state: IAppState) => state.covid.bookingForm
  );

  // update test centers
  useEffect(() => {
    if (cityDropdownValue) {
      getTestCentersOnCity(cityDropdownValue);
    }
  }, [cityDropdownValue]);

  // on test center selected
  useEffect(() => {
    if (testCenterValue) {
      getTestCenterSchedules(testCenterValue);
    }
  }, [testCenterValue]);

  async function ifCountrySelectedBefore() {
    const copyArray = booking;
    if (booking[0].country_id) {
      copyArray[itemIndex].country_id = booking[0].country_id;
      copyArray[itemIndex].test_country_name = booking[0].test_country_name;
      setCountryDropDown(booking[0].country_id);
    }
    logNow(booking);
    await dispatch(addCovidBooking(copyArray));
  }
  useEffect(() => {
    ifCountrySelectedBefore();
  }, [focused]);

  // on test date change

  useEffect(() => {
    const mSlots: any =
      testCenterSchedules?.test_centre_schedules.filter((item) => {
        return item?.schedule_date.toString() == testDate;
      })[0] ?? [];
    try {
    } catch (err) {}
    setMorningTimeSlots(mSlots?.morning_time_slots ?? []);
    setEveningTimeSlots(mSlots?.afternoon_time_slots ?? []);
  }, [testDate]);

  useEffect(() => {
    setCityDropDown(null);
    setCovidTestCenter(null);
    setTestCenter('');
    setTestCenters([]);
    setTestTime('');
    setTestDate('');
  }, [countryDropdownValue]);

  useEffect(() => {
    setTestCenter('');
    setTestCenters([]);
    setTestTime('');
    setTestDate('');
  }, [cityDropdownValue]);
  /*eslint-enable*/
  // Database values for update or delete operations
  const [sDName, setSDName] = useState('');

  function onPress() {
    openAndCloseBooking(itemIndex);
    // setShow(!show);
  }

  // changing dependent Id
  const changeDependantId = async (id: number) => {
    const copyArray = booking;
    copyArray[itemIndex].dependent_id = id;
    await dispatch(addCovidBooking(copyArray));
  };

  // change country name and country id
  const changeCountryNameAndCountryId = async (id: number) => {
    const copyArray = booking;
    const obj = bookingFormData.country_list.find((item) => item.id == id);
    copyArray[itemIndex].country_id = id;
    copyArray[itemIndex].test_country_name = obj?.name;
    logNow(booking);
    await dispatch(addCovidBooking(copyArray));
  };

  // change country name and country id
  const changeCityNameAndCityId = async (id: number) => {
    const copyArray = booking;
    const obj = bookingFormData.country_list
      .filter((item2) => item2.id == countryDropdownValue)[0]
      ?.cities.find((item) => item.id == id);
    copyArray[itemIndex].city_id = id;
    copyArray[itemIndex].test_city_name = obj?.name;
    logNow(booking);
    await dispatch(addCovidBooking(copyArray));
  };

  // changing test center name
  const changeTestCenterTypeAndName = async (id: number) => {
    logNow(booking);

    const copyArray = booking;
    // const obj = testCentersBasedOnCities.find((item) => item.id == id);
    copyArray[itemIndex].test_type_id = id;
    copyArray[itemIndex].test_location = 'Test Centre';
    await dispatch(addCovidBooking(copyArray));
  };

  // changing test center name
  const changeTestCenterNameAndId = async (id: number) => {
    logNow(booking);

    const copyArray = booking;
    const obj = testCentersBasedOnCities
      .find((item) => item.id == booking[itemIndex].test_type_id)
      ?.clinics.find((item) => item.test_centre_id == id);
    copyArray[itemIndex].test_centre_id = id;
    copyArray[itemIndex].test_centre_name = obj?.test_centre_name;
    copyArray[itemIndex].amount = obj?.test_amount;
    copyArray[itemIndex].test_type_name = obj?.test_type_name;
    copyArray[itemIndex].currency = obj?.currency;
    copyArray[itemIndex].total_amount = obj?.test_amount;
    copyArray[itemIndex].test_address = '';
    copyArray[itemIndex].test_address_details = '';
    await dispatch(addCovidBooking(copyArray));
  };

  // change country name and country id
  const changeScheduleId = async (date: any) => {
    const tD = date?.toISOString().slice(0, 10);
    const copyArray = booking;
    // const obj = bookingFormData.country_list.find((item) => item.id == id);
    const mSlots = testCenterSchedules?.test_centre_schedules.find((item) => {
      return item?.schedule_date == tD;
    });

    logNow({ tD: tD, mSlots });

    copyArray[itemIndex].schedule_id = mSlots?.id;
    logNow(booking);
    await dispatch(addCovidBooking(copyArray));
  };

  // change slot time id
  const changeSlotId = async (id: number) => {
    logNow(id);
    const copyArray = booking;
    copyArray[itemIndex].slot_id = id;
    try {
      logNow(
        '1',
        new Date(getZonedTimeDate(testDate, testTimeFormat).toISOString())
      );
      logNow('2', getZonedTimeDate(testDate, testTimeFormat).toString());
      logNow('3', getZonedTimeDate(testDate, testTimeFormat).toUTCString());
    } catch (err) {}
    copyArray[itemIndex].confirmation_date = getZonedTimeDate(
      testDate,
      testTimeFormat
    ).toISOString();
    logNow(booking);
    await dispatch(addCovidBooking(copyArray));
  };

  // change slot time id
  const changeToBookingStatus = async () => {
    const copyArray = booking;
    copyArray[itemIndex].booking_status = 0;
    logNow(booking);
    await dispatch(addCovidBooking(copyArray));
  };

  const _renderItemForDependants = ({
    item,
  }: // index,
  {
    item: DependentData;
    // index: number;
  }) => {
    const {} = item;
    const selectedDependentBg =
      booking[itemIndex].dependent_id === item.id
        ? { backgroundColor: colors.primary }
        : {};
    const selectedDependantTxtColor =
      booking[itemIndex].dependent_id === item.id
        ? { color: colors.white }
        : { color: colors.darkPrimary };
    return (
      <Pressable
        onPress={() => {
          // setSelectedDependant(item.id);
          changeDependantId(item.id);
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

  const MapMarkerRender = ({ item }: { item: TestClinic }) => {
    // logNow('this is item ====>',item);
    return (
      <Marker
        key={0}
        coordinate={{
          latitude: parseFloat(item.test_centre_lat.toString()),
          longitude: parseFloat(item.test_centre_long.toString()),
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
            {`${item.currency} ${item.test_amount}`}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={styles.parent}>
      <CountryNotChangeDialog
        setIsVisible={setIsCountryDialog}
        isVisible={isCountryDialog}
      />
      <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.titleText}>
          {sDName
            ? sDName
            : !booking[itemIndex].is_dependant
            ? 'You'
            : 'Dependants'}
        </Text>
        <View style={styles.bookingStatusContainer}>
          <Text
            style={[
              styles.statusText,
              booking[itemIndex].booking_status == 0
                ? { color: colors.lightGreen }
                : { color: colors.red },
            ]}
          >
            {booking[itemIndex].booking_status == 0
              ? 'Declared'
              : 'Not Booked Yet'}
          </Text>
          <Entypo
            size={responsiveFontSize(30)}
            name={
              itemIndex == openedBooking
                ? 'chevron-small-down'
                : 'chevron-small-right'
            }
          />
        </View>
      </Pressable>
      {itemIndex == openedBooking ? <View style={styles.headerLine} /> : null}
      <ExpandableView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        show={itemIndex == openedBooking}
      >
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
          <View style={styles.expendedContainer}>
            {!booking[itemIndex].is_dependant ? null : (
              <>
                <Text style={styles.innerTitle}>Choose a Dependant</Text>
                <FlatList
                  renderItem={_renderItemForDependants}
                  data={dependants}
                />
                <View
                  style={[styles.headerLine, { marginVertical: heightToDp(2) }]}
                />
              </>
            )}

            <Text style={styles.innerTitle}>
              Where would you like to get tested?
            </Text>
            <View style={styles.getTestedContainer}>
              <View style={styles.btnContainer}>
                <CircleBtn
                  icon={
                    <Entypo
                      size={responsiveFontSize(45)}
                      name="squared-plus"
                      color={colors.white}
                    />
                  }
                />
                <Text style={styles.innerTitle}>Test Centre</Text>
              </View>
              <View style={styles.btnContainer}>
                <CircleBtn
                  disabled={true}
                  icon={
                    <Entypo
                      size={responsiveFontSize(45)}
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
              {booking[0].country_id && booking.length > 1 ? (
                <FakeDropdownUnSelectable
                  onPress={() => setIsCountryDialog(true)}
                  title={booking[0]?.test_country_name || ''}
                />
              ) : (
                <DropdownCountryCity
                  options={bookingFormData.country_list.map((item) => {
                    return { value: item.id, label: item.name };
                  })}
                  selectedValue={countryDropdownValue}
                  onValueChange={(value: any) => {
                    // logNow(value);
                    setTimeout(() => {
                      setCountryDropDown(value);
                      changeCountryNameAndCountryId(value);
                    }, 1000);
                  }}
                />
              )}
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
                    selectedValue={cityDropdownValue ?? undefined}
                    onValueChange={(value: any) => {
                      setCityDropDown(value);
                      changeCityNameAndCityId(value);
                    }}
                  />
                </>
              ) : null}
              {/* Select Test Center */}
              <View style={{ marginTop: heightToDp(1) }} />
              {testCentersBasedOnCities.length > 0 ? (
                <>
                  <Text style={styles.innerTitle}>Select a covid Test</Text>
                  <DropdownCountryCity
                    options={testCentersBasedOnCities?.map((item) => {
                      return { label: item.name, value: item.id };
                    })}
                    selectedValue={covidTestCenterValue}
                    onValueChange={(value: any) => {
                      setCovidTestCenter(value);
                      changeTestCenterTypeAndName(value);
                    }}
                  />
                  {/* <DropdownMenu
                    options={testCentersBasedOnCities.map((item) => {
                      return { label: item.name, value: item.id };
                    })}
                    selectedValue={covidTestCenterValue}
                    onValueChange={(value: any) => {
                      setCovidTestCenter(value);
                      changeTestCenterTypeAndName(value);
                    }}
                  /> */}
                </>
              ) : null}
              <View style={{ marginTop: heightToDp(1) }} />
              {testCentersBasedOnCities.filter(
                (item) => item.id == covidTestCenterValue
              ).length > 0 ? (
                <>
                  <Text style={styles.innerTitle}>City Test Centers</Text>

                  {[
                    testCentersBasedOnCities.filter(
                      (item) => item.id == covidTestCenterValue
                    )[0]?.clinics[0],
                  ]?.map((item2, index2) => {
                    return (
                      <MapView
                        key={index2}
                        style={{
                          width: widthToDp(88),
                          height: heightToDp(20),
                        }}
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        region={{
                          latitude: parseFloat(
                            item2.test_centre_lat.toString()
                          ),
                          longitude: parseFloat(
                            item2.test_centre_long.toString()
                          ),
                          latitudeDelta: 0.015,
                          longitudeDelta: 0.0121,
                        }}
                      >
                        <MapMarkerRender item={item2} />
                      </MapView>
                    );
                  })}
                </>
              ) : null}
              <View style={{ marginTop: heightToDp(1) }} />
              {covidTestCenterValue ? (
                <>
                  <Text style={styles.innerTitle}>Test Centre</Text>
                  <DropdownMenu
                    width={88}
                    options={testCentersBasedOnCities
                      .filter((item) => item.id == covidTestCenterValue)[0]
                      ?.clinics.map((item2) => {
                        return {
                          label: `${item2.currency} ${item2.test_amount} - ${item2.test_centre_address}`,
                          value: item2.test_centre_id,
                        };
                      })}
                    selectedValue={testCenterValue}
                    onValueChange={(value: any) => {
                      setTestCenter(value);
                      changeTestCenterNameAndId(value);
                    }}
                  />
                </>
              ) : null}
            </View>

            {testCenterValue ? (
              <>
                <Text style={styles.innerTitle}>Choose a test date</Text>
                <CalenderStrip
                  setValue={(value) => {
                    setTestDate(value?.toISOString().slice(0, 10));
                    changeScheduleId(value);
                  }}
                />
                <View style={{ marginTop: heightToDp(1) }} />
              </>
            ) : null}

            {/* shift chooser */}

            {morningTimeSlots.length > 0 ? (
              <>
                <Text style={styles.innerTitle}>Morning timeslots</Text>
                <TimeSlots
                  testDate={testDate}
                  time={testTime}
                  setTime={(t: any) => {
                    setTestTime(t);
                    changeSlotId(t);
                  }}
                  setTimeFormat={setTimeFormat}
                  slots={morningTimeSlots}
                />
              </>
            ) : null}
            {eveningTimeSlots.length > 0 ? (
              <>
                <Text style={styles.innerTitle}>Evening timeslots</Text>
                <TimeSlots
                  testDate={testDate}
                  time={testTime}
                  setTime={(t: any) => {
                    setTestTime(t);
                    changeSlotId(t);
                  }}
                  setTimeFormat={setTimeFormat}
                  slots={eveningTimeSlots}
                />
              </>
            ) : null}
            <View style={styles.bottomBtnContainer}>
              <View
                style={[styles.bottomBtn, { backgroundColor: colors.white }]}
              >
                <Text style={styles.bottomBtnText}>Remove</Text>
              </View>
              <Pressable
                onPress={() => {
                  changeToBookingStatus();
                  setOpendedBooking(-1);
                }}
                disabled={!testTime}
                style={[
                  styles.bottomBtn,
                  testTime
                    ? { backgroundColor: colors.primary }
                    : { backgroundColor: colors.fieldGrey },
                ]}
              >
                <Text style={[styles.bottomBtnText, { color: colors.white }]}>
                  Done
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ExpandableView>
    </View>
  );
};

export default ExisitingBookingForDependent;
