/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
  DropdownMenu,
} from 'components/base';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
// import { navigate } from 'services/nav-ref';
// import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';

import makeStyles from './styles';
import { ActivityIndicator } from 'components';
import {
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';

type RenderDosageProps = {
  title: string;
  quantity: number;
  setter: (value: number) => void;
  iconLeft: React.ReactNode;
  Add: React.ReactNode;
  Minus: React.ReactNode;
};
const Medication = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [hbvalue, setHbvalue] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();
  const [validation, setValidation] = useState<any>(false);
  const [validation2, setValidation2] = useState<any>(false);
  const [options, setOptions] = useState<any>([]);
  const [options2, setOptions2] = useState<any>([]);
  const [wine, setWine] = React.useState(0);

  const [dropdownValue, setDropdown] = useState<any>();
  const [isDropdownChanged, setIsDropDownChanged] = useState(false);

  const [dropdownValue2, setDropdown2] = useState<any>();
  const [isDropdownChanged2, setIsDropDownChanged2] = useState(false);

  const medicationList = useSelector(
    (state: IAppState) => state.home.medicationList
  );
  const drop = useSelector((state: IAppState) => state.home.medicalDropDown);

  useEffect(() => {
    console.log('medication', medicationList);
    let arr = [];
    medicationList.map((ele) => {
      arr.push({ label: ele.name, value: ele.medication_record_id });
    });
    setOptions(arr);

    let arr2 = [];
    drop?.meal_type?.map((ele) => {
      arr2.push({ label: ele.name, value: ele.id });
    });
    setOptions2(arr2);

    let today = new Date();
    let dateTime =
      getMonth(today) +
      ' ' +
      getDay(today) +
      ', ' +
      getYear(today) +
      ' ' +
      getTime(today);
    setDateAndTime(dateTime);
  }, []);

  const onChangeText = (values) => {
    console.log('value', values);

    if (values < 5 || values > 15) {
      setValidation2(false);
      setValidation(true);
    } else {
      setValidation(false);
      setValidation2(false);
      console.log('emmty');
    }
    setHbvalue(values);
    // setValue(value);
  };

  const onSubmit = async () => {
    // let dateTime = '';
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // dateTime =
    //   getMonth(dateAndtime) +
    //   ' ' +
    //   getDay(dateAndtime) +
    //   ', ' +
    //   getYear(dateAndtime) +
    //   ' ' +
    //   getTime(dateAndtime);
    // console.log('bp_systolic', hbvalue);
    // try {
    //   setIsLoading(true);
    //   const response = await userService.createHba1c({
    //     hba1c: {
    //       data_value: hbvalue,
    //       unit_list_id: 3,
    //       record_date: dateAndtime,
    //     },
    //   });
    //   console.log('HbA1c successful', response.data);
    //   alert('HbA1c successful');
    //   setIsLoading(false);
    // } catch (error) {
    //   setIsLoading(false);
    //   console.log(error);
    //   if (error.errMsg.status === '500') {
    //     showMessage({
    //       message: 'Internal Server Error',
    //       type: 'danger',
    //     });
    //   } else if (error.errMsg.status === false) {
    //     showMessage({
    //       message: error.errMsg.data.error,
    //       type: 'danger',
    //     });
    //   } else {
    //     showMessage({
    //       message: error.errMsg,
    //       type: 'danger',
    //     });
    //   }
    // }
  };
  const RenderDosage = (props: RenderDosageProps) => (
    <View style={styles.rowContainer}>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => props.quantity > 0 && props.setter(props.quantity - 1)}
          style={{ marginRight: 10 }}
        >
          {props.Minus}
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{ fontSize: 40, paddingVertical: 12, paddingHorizontal: 12 }}
          >
            {props.quantity}
          </Text>
          <Text style={[styles.label, { marginTop: 0 }]}>unit(s)</Text>
          <TouchableOpacity
            onPress={() => props.setter(props.quantity + 1)}
            style={{ marginLeft: 10 }}
          >
            {props.Add}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <TitleWithBackWhiteBgLayout title="Take Medication" binIcon={true}>
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            // borderWidth: 5,
            marginBottom: heightToDp(19),
          }}
        >
          <View style={styles.dropDown}>
            <Text style={styles.textStyle}>Medication</Text>
            <DropdownMenu
              options={options}
              selectedValue={dropdownValue}
              onValueChange={(text: any) => {
                setDropdown(text);
                setIsDropDownChanged(true);
              }}
              error={
                isDropdownChanged
                  ? dropdownValue === '---'
                    ? 'Please select your ethnicity'
                    : ''
                  : ''
              }
            />
          </View>
          {dropdownValue ? (
            <>
              <Text style={styles.textStyle}>Dosage</Text>
              <RenderDosage
                quantity={wine}
                setter={setWine}
                Add={
                  <FontAwesome5
                    name={'plus'}
                    size={responsiveFontSize(22)}
                    color={colors.darkPrimary}
                    style={{ marginRight: 10 }}
                  />
                }
                Minus={
                  <FontAwesome5
                    name={'minus'}
                    size={responsiveFontSize(22)}
                    color={colors.darkPrimary}
                    style={{ marginRight: 10 }}
                  />
                }
              />
              <Text style={styles.textStyle}>Meal</Text>
              <DropdownMenu
                options={options2}
                selectedValue={dropdownValue2}
                onValueChange={(text: any) => {
                  setDropdown2(text);
                  setIsDropDownChanged2(true);
                }}
                error={
                  isDropdownChanged2
                    ? dropdownValue2 === '---'
                      ? 'Please select your ethnicity'
                      : ''
                    : ''
                }
              />

              <Text style={styles.label}>Date - Time</Text>
              <DateTimePickerModal
                date={dateAndtime}
                setDate={(e: any) => setDateAndTime(e)}
              />
            </>
          ) : null}
        </View>

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={'Take'}
          disabled={!hbvalue || validation ? true : false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default Medication;
