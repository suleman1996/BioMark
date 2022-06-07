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
import {
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';
import { getReduxWeightProgress } from 'store/home/home-actions';
import { measurmentValidator } from 'utils/functions/measurments';
import SCREENS from 'navigation/constants/index';
import makeStyles from './styles';
import { navigate } from 'services/nav-ref';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';

const Weight = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  const weightProgress = useSelector(
    (state: IAppState) => state.home.getWeightProgressData
  );

  const [weightTracker, setWeightTracker] = useState({
    weight: '0.0',
    is_metric: true,
    date_entry: '',
  });
  const [error, setError] = useState<string>('');

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
      setWeightTracker({
        ...weightTracker,
        weight: Number((weightTracker.weight * 2.205).toFixed(1)),
      });
    } else {
      setWeightTracker({
        ...weightTracker,
        weight: Number((weightTracker.weight * (1 / 2.205)).toFixed(1)),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weightTracker.is_metric]);

  useEffect(() => {
    dispatch(getReduxWeightProgress(4739));
    console.log('weightProg', weightProgress);
    const is_metric = weightProgress?.is_metric;
    if (weightProgress?.is_metric) {
      setWeightTracker({
        date_entry: weightProgress.date_entry,
        weight: weightProgress.weight,
        is_metric,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
    setError(measurmentValidator(metric, 'weight', weightTracker.weight) || '');
  };

  const handleChange = (value: number, key: string) => {
    console.log(weightTracker.is_metric, key, value);
    setWeightTracker((prev: any) => ({ ...prev, [key]: value }));
    setError(measurmentValidator(weightTracker.is_metric, key, value) || '');
  };

  console.log(weightTracker);

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
          title={'Add'}
          disabled={!weightTracker ? true : false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default Weight;
