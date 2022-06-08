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

const Weight = ({ route }: any) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [weightTracker, setWeightTracker] = useState({
    weight: '0.0',
    is_metric: true,
    date_entry: '',
  });
  const [error, setError] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route?.params?.logId) {
      getWeightDataByID(route?.params?.logId);
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
    const weightData = await userService.getWeightProgress(id);
    setWeightTracker({
      date_entry: weightData.date_entry,
      weight: weightData.weight,
      is_metric: weightData?.is_metric,
    });
  };

  const onSubmit = async () => {
    let dateTime = '';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dateTime = getCalendarDate(weightTracker.date_entry);

    try {
      setIsLoading(true);
      await userService.createWeight({
        medical: {
          ...weightTracker,
        },
      });
      navigate(SCREENS.HEALTH_PROGRESS, 0);
      setIsLoading(false);
    } catch (errorr) {
      setIsLoading(false);
      if (errorr.errMsg.status === '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (errorr.errMsg.status === false) {
        showMessage({
          message: errorr.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: errorr.errMsg,
          type: 'danger',
        });
      }
    }
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

  return (
    <TitleWithBackWhiteBgLayout title="Weight">
      <ActivityIndicator visible={isLoading} />
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

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={route?.params?.logId ? 'Save Edit' : 'Add'}
          disabled={!weightTracker ? true : false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default Weight;
