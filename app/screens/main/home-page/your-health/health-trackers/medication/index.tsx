/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from 'store/IAppState';
import {
  getMedicationsTrackersAction,
  getReduxNewMedicationTracker,
} from 'store/home/home-actions';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
  DropdownMenu,
} from 'components/base';
import { ActivityIndicator } from 'components';

import { userService } from 'services/user-service/user-service';
import SCREENS from 'navigation/constants/index';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { getCalendarDate } from 'utils/functions/date-format';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import { navigate, goBack } from 'services/nav-ref';

import { makeStyles } from './styles';
import { DeleteModal } from 'components/higher-order';
import { AccountDeActivateModal } from 'components/ui';

type RenderDosageProps = {
  title: string;
  quantity: number;
  setter: (value: number) => void;
  iconLeft: React.ReactNode;
  Add: React.ReactNode;
  Minus: React.ReactNode;
  maxRange: number;
  minRange: number;
};
const Medication = ({ route }) => {
  const SELECTED_MEDICATION_LOG_ID = route?.params?.medication_log_id;

  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  const [medicationTrackerState, setMedicationTrackerState] = useState({
    dosage: 1,
    record_date: '',
    medication_log_id: '',
    meal_type: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [validation, setValidation] = useState<any>(true);
  const [options, setOptions] = useState<any>([]);
  const [options2, setOptions2] = useState<any>([]);
  const [minRange, setMinRange] = useState<any>(0);
  const [maxRange, setMaxRange] = useState(0);
  const [medicationListId, setMedicationListId] = useState(0);
  const [medicationName, setMedicationName] = useState('');

  const getMedNewTracker = useSelector(
    (state: IAppState) => state.home.getNewMedicationTracker
  );

  const updateState = (name: string, value: number | string) =>
    setMedicationTrackerState((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    if (!getMedNewTracker) return;

    setOptions(
      getMedNewTracker?.medication?.map((ele) => ({
        label: ele.name,
        value: ele.medication_log_id,
      }))
    );
    setOptions2(
      getMedNewTracker?.meal_type?.map((ele) => ({
        label: ele.name,
        value: ele.id,
      }))
    );

    let today = new Date();
    let dateTime = getCalendarDate(today);

    updateState('record_date', dateTime);
  }, [getMedNewTracker]);

  useEffect(() => {
    if (!SELECTED_MEDICATION_LOG_ID) return;
    init();
  }, [SELECTED_MEDICATION_LOG_ID]);

  const onSubmit = async () => {
    const dateTime = getCalendarDate(medicationTrackerState.record_date);

    try {
      setIsLoading(true);
      const body = { ...medicationTrackerState };
      body.record_date = dateTime;

      if ([4, 5, 6].includes(medicationListId)) delete body.meal_type;

      await userService.createMedication({
        medication: body,
      });
      dispatch(getMedicationsTrackersAction(moment().format('MMM D, YYYY')));
      navigate(SCREENS.HEALTH_PROGRESS, 2);
    } catch (error) {
      console.log(error);
      if (error?.errMsg?.status === 500) {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error?.errMsg?.status === false) {
        showMessage({
          message: error?.errMsg?.data?.error,
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

  const deleteMedication = useCallback(async () => {
    try {
      setIsLoading(true);
      setShowDeleteModal(false);
      await userService.deleteMedicationTracker(SELECTED_MEDICATION_LOG_ID);
      dispatch(getReduxNewMedicationTracker());
      goBack();
    } catch (error) {
      console.log(error);

      if (error?.errMsg?.status === 500) {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error?.errMsg?.status === false) {
        showMessage({
          message: error?.errMsg?.data?.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error?.errMsg,
          type: 'danger',
        });
      }
      setIsLoading(false);
    }
  }, [SELECTED_MEDICATION_LOG_ID]);

  const setDosageFromDropDown = (text) => {
    let medId = 0;
    const medicationSelected = getMedNewTracker?.medication?.find(
      (e) => e.medication_log_id === text
    );
    if (medicationSelected) {
      updateState('dosage', parseInt(medicationSelected?.dosage));
      setMinRange(medicationSelected?.min_range);
      setMaxRange(medicationSelected?.max_range);
      setMedicationListId(medicationSelected?.medication_list_id);
      medId = medicationSelected?.medication_list_id;
    }
    if (medId == 4 || medId == 5 || medId == 6) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  };

  const init = useCallback(async () => {
    setIsLoading(true);

    const res = await userService.getMedicationProgress(
      SELECTED_MEDICATION_LOG_ID
    );

    const recordDate = res.medication.record_date
      ? new Date(res.medication.record_date)
      : new Date();

    setMedicationTrackerState({
      dosage:
        res.medication.max_range && +res.medication.max_range == 1
          ? 1
          : +res.medication.dosage,
      meal_type: +res.medication.meal_type_id,
      medication_log_id: String(res.medication.medication_log_id),
      record_date: getCalendarDate(recordDate),
    });

    setMaxRange(res.medication.max_range || 1);
    setMinRange(res.medication.min_range);
    setOptions2(res.meal_type.map((e) => ({ label: e.name, value: e.id })));
    setMedicationListId(res.medication.medication_list_id);
    setMedicationName(res.medication.name);
    setValidation(false);
    setIsLoading(false);
  }, [SELECTED_MEDICATION_LOG_ID]);

  console.log({ options2, meal: medicationTrackerState.meal_type });

  return (
    <TitleWithBackWhiteBgLayout
      title={SELECTED_MEDICATION_LOG_ID ? 'Medication' : 'Take Medication'}
      binIcon={SELECTED_MEDICATION_LOG_ID}
      onPressIcon={() => setShowDeleteModal(true)}
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
          {SELECTED_MEDICATION_LOG_ID ? (
            <Text style={styles.medicationNameStyle}>{medicationName}</Text>
          ) : getMedNewTracker?.medication_dropdown ? (
            <View style={styles.dropDown}>
              <Text style={styles.textStyle}>Medication</Text>
              <DropdownMenu
                options={options}
                selectedValue={medicationTrackerState.medication_log_id}
                onValueChange={(text: any) => {
                  updateState('medication_log_id', text);
                  setDosageFromDropDown(text);
                }}
              />
            </View>
          ) : null}

          {medicationTrackerState.medication_log_id ? (
            <>
              <Text style={styles.textStyle}>Dosage</Text>
              {medicationListId == 4 ||
              medicationListId == 5 ||
              medicationListId == 6 ||
              maxRange == 1 ? (
                <Text style={styles.grayText}>
                  {medicationTrackerState.dosage} pill(s)
                </Text>
              ) : (
                <>
                  <RenderDosage
                    minRange={minRange}
                    maxRange={maxRange}
                    quantity={medicationTrackerState.dosage}
                    setter={(val) => updateState('dosage', val)}
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
                    selectedValue={medicationTrackerState.meal_type}
                    onValueChange={(text: any) => {
                      updateState('meal_type', text);
                      setValidation(false);
                    }}
                  />
                </>
              )}
              <Text style={styles.label}>Date - Time</Text>
              <DateTimePickerModal
                date={medicationTrackerState.record_date}
                maxDate={new Date().toString()}
                setDate={(e: any) => updateState('record_date', e)}
              />
            </>
          ) : null}
        </View>
      </ScrollView>
      <ButtonWithShadowContainer
        onPress={onSubmit}
        title={SELECTED_MEDICATION_LOG_ID ? 'Save Edit' : 'Take'}
        disabled={validation}
      />
      <AccountDeActivateModal
        callMe={deleteMedication}
        isVisible={showDeleteModal}
        setIsVisible={setShowDeleteModal}
        subHeading="Are you sure you want to delete this medication log?"
        headerText="Medication"
        buttonLowerText="No"
        buttonUpperText="Yes"
      />
    </TitleWithBackWhiteBgLayout>
  );
};

const RenderDosage = (props: RenderDosageProps) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
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
            props.quantity > props.minRange && props.setter(props.quantity - 1)
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
              props.quantity < props.maxRange &&
              props.setter(props.quantity + 1)
            }
            style={{ marginLeft: 10 }}
          >
            {props.Add}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Medication;
