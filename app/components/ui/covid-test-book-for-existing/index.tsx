import ExpandableView from '@pietile-native-kit/expandable-view';
import { DropdownMenu } from 'components/base';
import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import CircleBtn from '../../button/circleBtn';
import { responsiveFontSize } from './../../../utils/functions/responsive-text';
import CalenderStrip from './../../higher-order/calender-strip/index';
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

const ExisitingBookingForDependent = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [show, setShow] = useState(true);
  const [selectedDependant, setSelectedDependant] = useState(-1);

  const [countryDropdownValue, setCountryDropDown] = useState<any>();
  const [cityDropdownValue, setCityDropDown] = useState<any>();
  const [covidTestCenterValue, setCovidTestCenter] = useState<any>();
  const [testCenterValue, setTestCenter] = useState<any>();

  function onPress() {
    setShow(!show);
  }

  const _renderItemForDependants = ({ item, index }: any) => {
    const {} = item;
    const selectedDependentBg =
      selectedDependant === index ? { backgroundColor: colors.primary } : {};
    const selectedDependantTxtColor =
      selectedDependant === index
        ? { color: colors.white }
        : { color: colors.darkPrimary };
    return (
      <Pressable
        onPress={() => {
          setSelectedDependant(index);
        }}
        style={[styles.dependantConatiner, selectedDependentBg]}
      >
        <Text style={[styles.dName, selectedDependantTxtColor]}>
          Dependents
        </Text>
        <View style={styles.bookingStatusContainer}>
          <Text style={[styles.dType, selectedDependantTxtColor]}>
            Siblings
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.parent}>
      <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.titleText}>Dependents</Text>
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
            <FlatList renderItem={_renderItemForDependants} data={[1, 2, 3]} />
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

            <Text style={styles.innerTitle}>Choose a test date</Text>
            <CalenderStrip />
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
