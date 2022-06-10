/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
  DropdownMenu,
} from 'components/base';
import { IAppState } from 'store/IAppState';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
// import { navigate } from 'services/nav-ref';
// import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';

import makeStyles from './styles';
import { ActivityIndicator, InputWithUnits } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCalendarDate,
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';
import SCREENS from 'navigation/constants/index';
import { navigate } from 'services/nav-ref';
import { bloodSugarValidator } from 'utils/functions/measurments';

const BloodSugar = ({ route }) => {
  const SELECTED_BS_ID = route?.params?.logId;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [isLoading, setIsLoading] = useState(false);

  const [dropdownValue, setDropdown] = useState<any>();
  const [isDropdownChanged, setIsDropDownChanged] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();
  const [validation, setValidation] = useState<any>(false);
  const [validation2, setValidation2] = useState<any>(false);
  const [options, setOptions] = useState<any>([]);
  const [error, setError] = useState<string>('');
  const drop = useSelector((state: IAppState) => state.home.medicalDropDown);
  const bloodSugarProgress = useSelector(
    (state: IAppState) => state.home.getBsProgressData
  );

  const [bloodSugarTracker, setBloodSugarTracker] = useState({
    data_value: '0',
    unit_list_id: 1,
    record_date: '',
    meal_type_id: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (SELECTED_BS_ID) {
      getBloodSugarProgressDataByID(SELECTED_BS_ID);
    } else {
      setBloodSugarTracker({
        ...bloodSugarTracker,
        record_date: getCalendarDate(new Date()),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getBloodSugarProgressDataByID = async (id) => {
    setIsLoading(true);
    const weightData = await userService.getBloodSugarProgress(id);
    console.log('weightData', weightData);
    setBloodSugarTracker({
      data_value: weightData?.data_value,
      unit_list_id: weightData?.unit_list_id,
      record_date: weightData?.record_date,
      meal_type_id: weightData?.meal_type_id,
    });

    setIsLoading(false);
  };

  const saveBsLog = async () => {
    console.log('bloodSugarTracker', bloodSugarTracker);

    setIsLoading(true);
    const API_FUNCTION = SELECTED_BS_ID ? 'updateBsTracker' : 'createBsTracker';
    try {
      await userService[API_FUNCTION](bloodSugarTracker, SELECTED_BS_ID);
      navigate(SCREENS.HEALTH_PROGRESS);
    } catch (err: any) {
      console.error(err);
      if (error?.errMsg.status === '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error?.errMsg.status === false) {
        showMessage({
          message: error?.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error?.errMsg,
          type: 'danger',
        });
      }
    }
    setIsLoading(false);
  };
  const handleUnitChange = (selectedUnit: string) => {
    const unitListId = selectedUnit == 'mg/dl' ? 1 : 21;
    console.log('selectedUnit', selectedUnit);
    setBloodSugarTracker((prev: any) => ({
      ...prev,
      unit_list_id: unitListId,
    }));

    // setWeightTracker((prev: any) => ({
    //   ...prev,
    //   is_metric: metric,
    // }));
    console.log('bloodSugarTracker', bloodSugarTracker);

    // const metric = selectedUnit == 'kg' ? true : false;
    // setBloodSugarTracker((prev: any) => ({
    //   ...prev,
    //   is_metric: metric,
    // }));
    setError(
      bloodSugarValidator(selectedUnit, bloodSugarTracker.data_value) || ''
    );
  };
  const handleChange = (value: number, key: string) => {
    setBloodSugarTracker({ ...bloodSugarTracker, [key]: value });
    setError(bloodSugarValidator(bloodSugarTracker.unit_list_id, key) || '');
    console.log('lllll', bloodSugarTracker);
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
          {/* <BloodSugarChooser
            width={'70%'}
            height={15}
            label="Your Reading"
            textAlign="right"
            placeholder={'0'}
            onChangeText={onChangeText}
            value={bloodSugarTracker?.data_value}
            selectedType={selectedType} 
            setSelectedType={setSelectedType}
            setValue={setValue}
          /> */}
          <InputWithUnits
            title="Your Reading"
            placeholder="0.0"
            units={['mg/dl', 'mmol/L']}
            unit={bloodSugarTracker.unit_list_id === 1 ? 'mg/dl' : 'mmol/L'}
            value={bloodSugarTracker?.data_value}
            onChangeText={(val: any) => handleChange(val, 'data_value')}
            onUnitChange={handleUnitChange}
            error={error || ''}
            onBlur={() => {
              setError(
                bloodSugarValidator(
                  bloodSugarTracker?.unit_list_id === 1 ? 'mg/dl' : 'mmol/L',
                  bloodSugarTracker.data_value
                ) || ''
              );
            }}
          />

          {/* {validation ? (
            <Text style={styles.errorMessage}>
              Please input a valid measurement from 1-600 mg/dL
            </Text>
          ) : null}
          {validation2 ? (
            <Text style={styles.errorMessage}>
              Please input a valid measurement from 0.06-50 mmol/L
            </Text>
          ) : null} */}

          {bloodSugarTracker?.data_value && !validation && !validation2 ? (
            <>
              <View style={styles.dropDown}>
                <Text style={styles.textStyle}>Meal</Text>
                <DropdownMenu
                  options={options}
                  selectedValue={bloodSugarTracker.meal_type_id}
                  onValueChange={(text: any) => {
                    setBloodSugarTracker({
                      ...bloodSugarTracker,
                      meal_type_id: text,
                    });
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
                date={bloodSugarTracker?.record_date}
                setDate={(e: any) =>
                  setBloodSugarTracker({
                    ...bloodSugarTracker,
                    record_date: e,
                  })
                }
              />
            </>
          ) : null}
        </View>

        <ButtonWithShadowContainer
          onPress={saveBsLog}
          title={route?.params?.logId ? 'Save Edit' : 'Add'}
          disabled={false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default BloodSugar;
