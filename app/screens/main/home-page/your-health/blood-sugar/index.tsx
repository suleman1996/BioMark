import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { BloodSugarChooser } from 'components/higher-order';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
  DropdownMenu,
} from 'components/base';
import { IAppState } from 'store/IAppState';
import { getReduxMedicalDropDown } from 'store/home/home-actions';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
// import { navigate } from 'services/nav-ref';
// import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';

import makeStyles from './styles';
import { ActivityIndicator } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';

const BloodSugar = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [value, setValue] = useState('');
  const [selectedType, setSelectedType] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [dropdownValue, setDropdown] = useState<any>();
  const [isDropdownChanged, setIsDropDownChanged] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();
  const [validation, setValidation] = useState<any>(false);
  const [validation2, setValidation2] = useState<any>(false);
  const [options, setOptions] = useState<any>([]);
  const drop = useSelector((state: IAppState) => state.home.medicalDropDown);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReduxMedicalDropDown());
    let arr = [];
    drop?.meal_type?.map((ele) => {
      console.log('ele', ele);
      arr.push({ label: ele.name, value: ele.id });
    });
    setOptions(arr);

    let today = new Date();
    let dateTime = '';
    dateTime =
      getMonth(today) +
      ' ' +
      getDay(today) +
      ', ' +
      getYear(today) +
      ' ' +
      getTime(today);
    setDateAndTime(dateTime);
    console.log('dt', dateTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onChangeText = (values) => {
    console.log('value', value);

    if ((values < 1 || values > 600) && selectedType === 1) {
      setValidation2(false);
      setValidation(true);
    } else if ((values < 0.06 || values > 50) && selectedType === 21) {
      setValidation(false);
      setValidation2(true);
    } else {
      setValidation(false);
      setValidation2(false);
      console.log('emmty');
    }
    setValue(values);
    // setValue(value);
  };

  const onSubmit = async () => {
    let dateTime = '';
    dateTime =
      getMonth(dateAndtime) +
      ' ' +
      getDay(dateAndtime) +
      ', ' +
      getYear(dateAndtime) +
      ' ' +
      getTime(dateAndtime);
    console.log('data_value', value);
    console.log('unit_list_id', selectedType);
    console.log('record_date', dateTime);
    console.log('meal_type_id', dropdownValue);
    try {
      setIsLoading(true);
      const response = await userService.createBloodSugar({
        blood_sugar: {
          data_value: value,
          unit_list_id: selectedType,
          record_date: dateTime,
          meal_type_id: dropdownValue,
        },
      });
      console.log('blood sugar successful', response.data);
      alert('blood sugar successful');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  return (
    <TitleWithBackWhiteBgLayout title="Blood Sugar">
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            // borderWidth: 5,
            marginBottom: heightToDp(25),
          }}
        >
          <BloodSugarChooser
            width={'70%'}
            height={15}
            label="Your Reading"
            textAlign="right"
            placeholder={'0'}
            onChangeText={onChangeText}
            value={value}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setValue={setValue}
          />
          {validation ? (
            <Text style={styles.errorMessage}>
              Please input a valid measurement from 1-600 mg/dL
            </Text>
          ) : null}
          {validation2 ? (
            <Text style={styles.errorMessage}>
              Please input a valid measurement from 0.06-50 mmol/L
            </Text>
          ) : null}

          {value && !validation && !validation2 ? (
            <>
              <View style={styles.dropDown}>
                <Text style={styles.textStyle}>Meal</Text>
                <DropdownMenu
                  options={options}
                  selectedValue={dropdownValue}
                  onValueChange={(text: any) => {
                    dispatch(getReduxMedicalDropDown());
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
              <Text style={styles.label}>Date of Birth</Text>
              <DateTimePickerModal
                date={dateAndtime}
                setDate={(e: any) => setDateAndTime(e)}
              />
            </>
          ) : null}
        </View>

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={'Add'}
          disabled={
            value === '' || !isDropdownChanged || validation || validation2
              ? true
              : false
          }
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default BloodSugar;
