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

const Weight = ({ route }: any) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const SELECTED_WEIGHT_ID = route?.params?.logId;

  const [weightTracker, setWeightTracker] = useState({
    weight: '0.0',
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

  useEffect(() => {
    if (!weightTracker.is_metric) {
      setWeightTracker((prev: any) => ({
        ...prev,
        weight: Number((prev.weight * 2.205).toFixed(1)),
      }));
    } else {
      setWeightTracker((prev: any) => ({
        ...prev,
        weight: Number((prev.weight * (1 / 2.205)).toFixed(1)),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weightTracker.is_metric]);

  const getWeightDataByID = async (id) => {
    setIsLoading(true);
    const weightData = await userService.getWeightProgress(id);
    setWeightTracker({
      date_entry: weightData.date_entry,
      weight: weightData.weight,
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
      await userService[API_FUNCTION](weightTracker, SELECTED_WEIGHT_ID);
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
    const metric = selectedUnit == 'kg' ? true : false;
    setWeightTracker((prev: any) => ({
      ...prev,
      is_metric: metric,
    }));
    setError(
      measurementValidator(metric, 'weight', weightTracker.weight) || ''
    );
  };

  const handleChange = (value: number, key: string) => {
    setWeightTracker({ ...weightTracker, [key]: value });
    setError(measurementValidator(weightTracker.is_metric, key, value) || '');
  };

  const deleteWeightLog = async () => {
    try {
      await userService.deleteWeightLog(SELECTED_WEIGHT_ID);
      navigate(SCREENS.HEALTH_PROGRESS);
    } catch (err) {
      console.error(err);
    }
  };

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
            title="Your Reading"
            placeholder="0.0"
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
                  weightTracker.weight
                ) || ''
              );
            }}
          />

          {error?.length === 0 && weightTracker?.weight ? (
            <>
              <Text style={styles.label}>Date - Time</Text>
              <DateTimePickerModal
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
          buttonLowerText="Skip"
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
