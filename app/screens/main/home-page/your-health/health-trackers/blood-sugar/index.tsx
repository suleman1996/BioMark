/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { hideMessage, showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from 'store/IAppState';
import {
  getReduxBloodSugarLogs,
  getReduxDashboard,
  getReduxHealthTracker,
} from 'store/home/home-actions';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
  DropdownMenu,
} from 'components/base';
import { ActivityIndicator, InputWithUnits } from 'components';
import { AccountDeActivateModal } from 'components/ui';

import { userService } from 'services/user-service/user-service';

import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants/index';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { getCalendarDate } from 'utils/functions/date-format';
import {
  bloodSugarValidator,
  mgMmolConversion,
} from 'utils/functions/measurments';

import makeStyles from './styles';
import { roundToDecimalPlaces } from 'utils/functions';
import { useTranslation } from 'react-i18next';

const BloodSugar = ({ route }) => {
  const { t } = useTranslation();
  const SELECTED_BS_ID = route?.params?.logId;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [isLoading, setIsLoading] = useState(false);

  const [options, setOptions] = useState<any>([]);
  const [error, setError] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { drop, latestBloodSugarTarget, hasBloodSugarTarget } = useSelector(
    (state: IAppState) => ({
      drop: state.home.medicalDropDown,
      hasBloodSugarTarget: state.home?.dashboard?.has_blood_sugar_target,
      latestBloodSugarTarget: state.home.bloodSugarTargets[0],
    })
  );

  const [bloodSugarTracker, setBloodSugarTracker] = useState({
    data_value: '',
    unit_list_id: 1,
    record_date: '',
    meal_type_id: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setBloodSugarTracker((prev: any) => ({
      ...prev,
      data_value: mgMmolConversion(
        +prev.data_value,
        bloodSugarTracker.unit_list_id === 1 ? 'mg/dL' : 'mmol/L'
      ),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bloodSugarTracker.unit_list_id]);

  useEffect(() => {
    //According to Issue 76 in https://docs.google.com/spreadsheets/d/1MfJWtiXKDeaRkD7utJ51CMwg275E15NQex2VGHNc2SA/edit#gid=416167280
    //These errors was supposed to be displayed.
    if (
      bloodSugarTracker?.data_value &&
      bloodSugarTracker?.meal_type_id &&
      bloodSugarTracker?.record_date
    ) {
      let range = [
        latestBloodSugarTarget?.ppg_value_from,
        latestBloodSugarTarget?.ppg_value_to,
      ];
      if ([1, 3, 5, 8].includes(bloodSugarTracker.meal_type_id)) {
        range = [
          latestBloodSugarTarget?.value_from,
          latestBloodSugarTarget?.value_to,
        ];
      }
      const value = +(bloodSugarTracker.unit_list_id ==
      latestBloodSugarTarget?.unit_list_id
        ? bloodSugarTracker?.data_value
        : mgMmolConversion(
            +bloodSugarTracker?.data_value,
            latestBloodSugarTarget?.unit_name
          ));

      if (+value < +range[0]) {
        showMessage({
          message: t('pages.bloodSugarInput.errors.belowRange'),
          type: 'danger',
          icon: 'warning',
        });
      } else if (+value > +range[1]) {
        showMessage({
          message: t('pages.bloodSugarInput.errors.aboveRange'),
          type: 'danger',
          icon: 'warning',
        });
      } else {
        hideMessage();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bloodSugarTracker, drop, latestBloodSugarTarget]);

  useEffect(() => {
    let arr = [];
    drop?.meal_type?.map((ele) => {
      arr.push({ label: ele.name, value: ele.id });
    });
    setOptions(arr);

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
    setBloodSugarTracker({
      data_value: roundToDecimalPlaces(weightData?.data_value, 2),
      unit_list_id: weightData?.unit_list_id,
      record_date: weightData?.record_date,
      meal_type_id: weightData?.meal_type_id,
    });

    setIsLoading(false);
  };

  const saveBsLog = async () => {
    setIsLoading(true);
    const API_FUNCTION = SELECTED_BS_ID ? 'updateBsTracker' : 'createBsTracker';
    try {
      if (!hasBloodSugarTarget) {
        await userService.setDefaultBloodSugarTarget();
        dispatch(getReduxDashboard());
      }
      await userService[API_FUNCTION](bloodSugarTracker, SELECTED_BS_ID);
      dispatch(getReduxBloodSugarLogs());
      dispatch(getReduxHealthTracker());
      navigate(SCREENS.HEALTH_PROGRESS, 1);
    } catch (err: any) {
      console.error(err);
      if (error?.errMsg?.status === '500') {
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
  const deleteBsLog = async () => {
    try {
      await userService.deleteBsLog(SELECTED_BS_ID);
      dispatch(getReduxBloodSugarLogs());
      dispatch(getReduxHealthTracker());
      navigate(SCREENS.HEALTH_PROGRESS, 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnitChange = (selectedUnit: string) => {
    const unitListId = selectedUnit == 'mg/dL' ? 1 : 21;
    setBloodSugarTracker((prev: any) => ({
      ...prev,
      unit_list_id: unitListId,
    }));
  };

  const handleChange = (value: number, key: string) => {
    setBloodSugarTracker((prev) => ({ ...prev, [key]: value }));
    setError(
      bloodSugarValidator(
        bloodSugarTracker?.unit_list_id === 1 ? 'mg/dL' : 'mmol/L',
        value
      ) || ''
    );
  };
  return (
    <TitleWithBackWhiteBgLayout
      binIcon={SELECTED_BS_ID ? true : false}
      title={t('pages.bloodSugarInput.title')}
      onPressIcon={() => setShowDeleteModal(true)}
    >
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            marginBottom: heightToDp(25),
          }}
        >
          <InputWithUnits
            title={t('pages.bloodSugarInput.yourReading')}
            placeholder={bloodSugarTracker?.unit_list_id === 1 ? '0.0' : '0.00'}
            units={['mg/dL', 'mmol/L']}
            unit={bloodSugarTracker?.unit_list_id === 1 ? 'mg/dL' : 'mmol/L'}
            value={
              bloodSugarTracker?.data_value == 0.0
                ? ''
                : bloodSugarTracker?.data_value
            }
            onChangeText={(val: any) => handleChange(val, 'data_value')}
            onUnitChange={handleUnitChange}
            error={error || ''}
            onBlur={() => {
              setError(
                bloodSugarValidator(
                  bloodSugarTracker?.unit_list_id === 1 ? 'mg/dL' : 'mmol/L',
                  bloodSugarTracker?.data_value
                ) || ''
              );
            }}
          />

          {bloodSugarTracker?.data_value && !error ? (
            <>
              <View style={styles.dropDown}>
                <Text style={styles.textStyle}>
                  {t('pages.bloodSugarInput.meal')}
                </Text>
                <DropdownMenu
                  options={options}
                  selectedValue={bloodSugarTracker.meal_type_id}
                  onValueChange={(text: any) => {
                    setBloodSugarTracker((prev) => ({
                      ...prev,
                      meal_type_id: text,
                    }));
                  }}
                />
              </View>
              <Text style={styles.label}>
                {t('pages.bloodSugarInput.dateTime')}
              </Text>
              <DateTimePickerModal
                maxDate={new Date()}
                date={bloodSugarTracker?.record_date}
                setDate={(e: any) =>
                  setBloodSugarTracker((prev) => ({
                    ...bloodSugarTracker,
                    record_date: e,
                  }))
                }
              />
            </>
          ) : null}
        </View>
      </ScrollView>
      <AccountDeActivateModal
        headerText={t('pages.bloodSugarInput.dialogs.delete.title')}
        subHeading={t('pages.bloodSugarInput.dialogs.delete.description')}
        buttonUpperText={t('pages.bloodSugarInput.dialogs.delete.buttonText')}
        buttonLowerText={t(
          'pages.bloodSugarInput.dialogs.delete.buttonCancelText'
        )}
        isVisible={showDeleteModal}
        setIsVisible={setShowDeleteModal}
        callMe={deleteBsLog}
      />
      <ButtonWithShadowContainer
        onPress={saveBsLog}
        title={
          route?.params?.logId
            ? t('pages.bloodSugarInput.save')
            : t('pages.bloodSugarInput.add')
        }
        disabled={
          bloodSugarTracker.data_value === '0.0' ||
          bloodSugarTracker.meal_type_id == 0 ||
          error
            ? true
            : false
        }
      />
    </TitleWithBackWhiteBgLayout>
  );
};

export default BloodSugar;
