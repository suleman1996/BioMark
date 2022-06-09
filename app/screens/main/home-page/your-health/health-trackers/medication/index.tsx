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

import { showMessage } from 'react-native-flash-message';
import SCREENS from 'navigation/constants/index';

import { ActivityIndicator } from 'components';
import {
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import {
  getReduxMedicationProgress,
  getReduxNewMedicationTracker,
} from 'store/home/home-actions';
import { makeStyles } from './styles';
import { navigate } from 'services/nav-ref';

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
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();
  const [validation, setValidation] = useState<any>(true);
  const [showDeleteIcon, setShowDeleteIcon] = useState<any>(false);
  const [options, setOptions] = useState<any>([]);
  const [options2, setOptions2] = useState<any>([]);
  const [dosage, setDosage] = React.useState(1);

  const [medicatioDropdownValue, setMedicatioDropdown] = useState<any>();
  const [isDropdownChanged, setIsDropDownChanged] = useState(false);

  const [mealDropDown, setMealDropDown] = useState<any>();
  const [isDropdownChanged2, setIsDropDownChanged2] = useState(false);

  const [minRange, setMinRange] = useState<any>(0);
  const [maxRange, setMaxRange] = useState(0);
  const [medicationListId, setMedicationListId] = useState(0);

  // const medicationList = useSelector(
  //   (state: IAppState) => state.home.medicationList
  // );
  const drop = useSelector((state: IAppState) => state.home.medicalDropDown);
  const getMedNewTracker = useSelector(
    (state: IAppState) => state.home.getNewMedicationTracker
  );
  const getMedicationProgressData = useSelector(
    (state: IAppState) => state.home.getMedicationProgressData
  );
  useEffect(() => {
    let arr = [];
    getMedNewTracker?.medication?.map((ele) => {
      arr.push({ label: ele.name, value: ele.medication_log_id });
    });
    setOptions(arr);

    let arr2 = [];
    getMedNewTracker?.meal_type?.map((ele) => {
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
  useEffect(() => {
    dispatch1(getReduxMedicationProgress(48819));

    if (getMedicationProgressData) {
      setDosage(getMedicationProgressData?.medication?.dosage);
    }
  }, [dispatch1]);

  const onSubmit = async () => {
    let dateTime = '';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dateTime =
      getMonth(dateAndtime) +
      ' ' +
      getDay(dateAndtime) +
      ', ' +
      getYear(dateAndtime) +
      ' ' +
      getTime(dateAndtime);

    try {
      setIsLoading(true);
      if (
        medicationListId == 4 ||
        medicationListId == 5 ||
        medicationListId == 6
      ) {
        const response = await userService.createMedication({
          medication: {
            dosage: dosage,
            record_date: dateTime,
            medication_log_id: medicatioDropdownValue,
          },
        });
      } else {
        const response = await userService.createMedication({
          medication: {
            dosage: dosage,
            record_date: dateTime,
            medication_log_id: medicatioDropdownValue,
            meal_type: mealDropDown,
          },
        });

        navigate(SCREENS.HEALTH_PROGRESS, 2);
      }

      dispatch(getReduxNewMedicationTracker());

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (error.errMsg.status === '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status === false) {
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
  const deleteMedication = async () => {
    try {
      setIsLoading(true);
      const response = await userService.deleteMedicationTracker(
        medicatioDropdownValue
      );
      dispatch(getReduxNewMedicationTracker());

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (error.errMsg.status === '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status === false) {
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
  const setDosageFromDropDown = (text) => {
    let medId = 0;
    getMedNewTracker?.medication?.map((ele) => {
      if (ele.medication_log_id === text) {
        setDosage(parseInt(ele?.dosage));
        setMinRange(ele?.min_range);
        setMaxRange(ele?.max_range);
        setMedicationListId(ele?.medication_list_id);
        medId = ele?.medication_list_id;
      }
    });
    if (medId == 4 || medId == 5 || medId == 6) {
      setValidation(false);
    } else {
      setValidation(true);
    }
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
          onPress={() =>
            props.quantity > minRange && props.setter(props.quantity - 1)
          }
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
            onPress={() =>
              props.quantity < maxRange && props.setter(props.quantity + 1)
            }
            style={{ marginLeft: 10 }}
          >
            {props.Add}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <TitleWithBackWhiteBgLayout
      title="Take Medication"
      binIcon={showDeleteIcon}
      onPressIcon={() => deleteMedication()}
    >
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            // borderWidth: 5,
            marginBottom: heightToDp(19),
            backgroundColor: colors.white,
          }}
        >
          {getMedNewTracker?.medication_dropdown ? (
            <View style={styles.dropDown}>
              <Text style={styles.textStyle}>Medication</Text>
              <DropdownMenu
                options={options}
                selectedValue={medicatioDropdownValue}
                onValueChange={(text: any) => {
                  setMedicatioDropdown(text);
                  setIsDropDownChanged(true);
                  setDosageFromDropDown(text);
                  setShowDeleteIcon(true);
                }}
                error={
                  isDropdownChanged
                    ? medicatioDropdownValue === '---'
                      ? 'Please select your ethnicity'
                      : ''
                    : ''
                }
              />
            </View>
          ) : null}

          {medicatioDropdownValue ? (
            <>
              <Text style={styles.textStyle}>Dosage</Text>
              {medicationListId == 4 ||
              medicationListId == 5 ||
              medicationListId == 6 ? (
                <Text style={styles.grayText}>{dosage} pill(s)</Text>
              ) : (
                <>
                  <RenderDosage
                    quantity={dosage}
                    setter={setDosage}
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
                    selectedValue={mealDropDown}
                    onValueChange={(text: any) => {
                      setMealDropDown(text);
                      setIsDropDownChanged2(true);
                      setValidation(false);
                    }}
                    error={
                      isDropdownChanged2
                        ? mealDropDown === '---'
                          ? 'Please select your ethnicity'
                          : ''
                        : ''
                    }
                  />
                </>
              )}
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
          disabled={validation ? true : false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default Medication;
