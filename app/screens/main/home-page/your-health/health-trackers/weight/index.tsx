/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';

import { InputWithUnits, ActivityIndicator } from 'components';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
} from 'components/base';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
import { getCalendarDate } from 'utils/functions/date-format';
import { measurementValidator } from 'utils/functions/measurments';
import SCREENS from 'navigation/constants/index';
import { navigate } from 'services/nav-ref';

import makeStyles from './styles';
import { AccountDeActivateModal } from 'components/ui';
import { useDispatch } from 'react-redux';
import {
  getReduxHealthTracker,
  getReduxWeightLogs,
} from 'store/home/home-actions';
import moment from 'moment';
import { roundToDecimalPlaces } from 'utils/functions';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';

const Weight = ({ route }: any) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const SELECTED_WEIGHT_ID = route?.params?.logId;
  const dispatch = useDispatch();

  const [weightTracker, setWeightTracker] = useState({
    weight: '',
    is_metric: true,
    date_entry: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (SELECTED_WEIGHT_ID) {
      getWeightDataByID(SELECTED_WEIGHT_ID);
    } else {
      setWeightTracker({
        ...weightTracker,
        date_entry: getCalendarDate(new Date()),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWeightDataByID = async (id) => {
    setIsLoading(true);
    const weightData = await userService.getWeightProgress(id);

    setWeightTracker({
      date_entry: weightData.date_entry,
      weight: roundToDecimalPlaces(weightData.weight),
      is_metric: weightData?.is_metric,
    });
    setIsLoading(false);
  };

  const saveWeightLog = async () => {
    setIsLoading(true);
    const API_FUNCTION = SELECTED_WEIGHT_ID
      ? 'updateWeightTracker'
      : 'createWeightTracker';
    try {
      await userService[API_FUNCTION](
        {
          ...weightTracker,
          date_entry: moment(weightTracker.date_entry).toDate().toString(),
        },
        SELECTED_WEIGHT_ID
      );
      dispatch(getReduxWeightLogs());
      dispatch(getReduxHealthTracker());

      navigate(SCREENS.HEALTH_PROGRESS, 0);
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
    const metric = selectedUnit == 'kg' ? true : false;
    setWeightTracker((prev: any) => ({
      ...prev,
      is_metric: metric,
      weight: !metric
        ? (Number(prev.weight) * 2.20462).toFixed(1).toString()
        : ((Number(prev.weight) * 1) / 2.20462).toFixed(1).toString(),
    }));
  };

  const handleChange = (value: number, key: string) => {
    setWeightTracker({ ...weightTracker, [key]: value });
  };

  const deleteWeightLog = async () => {
    try {
      await userService.deleteWeightLog(SELECTED_WEIGHT_ID);
      dispatch(getReduxWeightLogs());
      dispatch(getReduxHealthTracker());

      navigate(SCREENS.HEALTH_PROGRESS, 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (weightTracker.weight == '') return;
    setError(
      measurementValidator(
        weightTracker.is_metric,
        'weight',
        weightTracker.weight,
        t
      ) || ''
    );
  }, [t, weightTracker]);
  return (
    <TitleWithBackWhiteBgLayout
      binIcon={SELECTED_WEIGHT_ID ? true : false}
      onPressIcon={() => setShowDeleteModal(true)}
      title="Weight"
    >
      <ActivityIndicator visible={isLoading || isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            marginBottom: heightToDp(25),
          }}
        >
          <InputWithUnits
            labelStyle={{ fontSize: RFValue(17) }}
            title="Your Reading"
            placeholder={
              route?.params?.data ? route?.params?.data.toString() : '0.00'
            }
            units={['kg', 'lbs']}
            unit={weightTracker.is_metric ? 'kg' : 'lbs'}
            value={weightTracker.weight.toString()}
            onChangeText={(val: any) => handleChange(val, 'weight')}
            onUnitChange={handleUnitChange}
            error={error || ''}
            onBlur={() => {
              setError(
                measurementValidator(
                  weightTracker.is_metric,
                  'weight',
                  weightTracker.weight,
                  t
                ) || ''
              );
            }}
          />

          {error?.length === 0 && weightTracker?.weight ? (
            <>
              <Text style={styles.label}>Date - Time</Text>
              <DateTimePickerModal
                maxDate={new Date()}
                date={weightTracker?.date_entry}
                setDate={(e: any) =>
                  setWeightTracker((tracker) => ({ ...tracker, date_entry: e }))
                }
              />
            </>
          ) : null}
        </View>
      </ScrollView>
      {showDeleteModal && (
        <AccountDeActivateModal
          headerText="Weight"
          subHeading="Are you sure you wish to delete this weight log?"
          buttonUpperText="Yes"
          buttonLowerText="No"
          isVisible={showDeleteModal}
          setIsVisible={setShowDeleteModal}
          callMe={deleteWeightLog}
        />
      )}
      <ButtonWithShadowContainer
        onPress={saveWeightLog}
        title={SELECTED_WEIGHT_ID ? 'Save Edit' : 'Add'}
        disabled={!weightTracker.weight || error ? true : false}
      />
    </TitleWithBackWhiteBgLayout>
  );
};

export default Weight;
