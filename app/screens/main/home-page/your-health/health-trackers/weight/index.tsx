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
import {
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';
import { measurmentValidator } from 'utils/functions/measurments';

import makeStyles from './styles';

const Weight = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [weightTracker, setWeightTracker] = useState({
    weight: '',
    is_metric: true,
    date_entry: '',
  });
  const [error, setError] = useState<string>('erro');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let today = new Date();
    let dateTime =
      getMonth(today) +
      ' ' +
      getDay(today) +
      ', ' +
      getYear(today) +
      ' ' +
      getTime(today);

    setWeightTracker((tracker) => ({ ...tracker, date_entry: dateTime }));
  }, []);

  useEffect(() => {
    if (!weightTracker.is_metric) {
      setWeightTracker((prev) => ({
        ...prev,
        weight: Number((prev.weight * 2.205).toFixed(1)),
      }));
    } else {
      setWeightTracker((prev) => ({
        ...prev,
        weight: Number((prev.weight * (1 / 2.205)).toFixed(1)),
      }));
    }
  }, [weightTracker.is_metric]);

  const onSubmit = async () => {
    let dateTime = '';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dateTime =
      getMonth(weightTracker.date_entry) +
      ' ' +
      getDay(weightTracker.date_entry) +
      ', ' +
      getYear(weightTracker.date_entry) +
      ' ' +
      getTime(weightTracker.date_entry);

    try {
      setIsLoading(true);
      await userService.createWeight({
        medical: {
          ...weightTracker,
        },
      });

      alert('weight submitted ');
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
    setWeightTracker((prev: any) => ({
      ...prev,
      is_metric: selectedUnit === 'kg' ? true : false,
    }));
  };

  const handleChange = (value: number, key: string) => {
    setWeightTracker((prev: any) => ({ ...prev, [key]: value }));
    setError(measurmentValidator(weightTracker.is_metric, key, value) || '');
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
                measurmentValidator(
                  weightTracker.is_metric,
                  'weight',
                  weightTracker.weight
                ) || ''
              );
            }}
          />

          {error.length === 0 && weightTracker.weight && (
            <>
              <Text style={styles.label}>Date - Time</Text>
              <DateTimePickerModal
                date={weightTracker.date_entry}
                setDate={(e: any) =>
                  setWeightTracker((tracker) => ({ ...tracker, date_entry: e }))
                }
              />
            </>
          )}
        </View>

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={'Add'}
          disabled={!weightTracker ? true : false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default Weight;
