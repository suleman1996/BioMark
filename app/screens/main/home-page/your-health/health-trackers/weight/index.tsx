/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import InputWithUnits from 'components/input-with-units';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
} from 'components/base';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
// import { navigate } from 'services/nav-ref';
// import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';

import makeStyles from './styles';
import { ActivityIndicator } from 'components';
import {
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';

const Weight = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [value, setValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();
  const [validation, setValidation] = useState<any>(false);
  const [validation2, setValidation2] = useState<any>(false);
  const [selectedTypeWeight, setSelectedTypeWeight] = useState(1);
  const [bodyMeasurment, setBodyMeasurment] = useState({
    weight: 0,
    is_metric: true,
  });
  const [error, setError] = useState({
    weightError: '',
  });
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
    setDateAndTime(dateTime);
  }, []);

  const handleUnitChange = (selectedUnit: string) => {
    console.log('selectedUnit', selectedUnit);

    setBodyMeasurment((prev: any) => ({
      ...prev,
      is_metric: selectedUnit === 'kg' ? true : false,
    }));
    console.log('bodyMeasurment', bodyMeasurment);
  };
  const handleChange = (value: number, key: string) => {
    setBodyMeasurment((prev: any) => ({ ...prev, [key]: value }));
  };

  const measurmentValidator = (is_metric, measurment, value) => {
    let errorr = '';
    const WEIGHT_RANGE = {
      kg: {
        min: 0,
        max: 200,
        errorr: 'Should be between 0-200kg',
      },
      lbs: {
        min: 0,
        max: 440,
        errorr: 'Should be between 0-440kg',
      },
    };

    console.log(is_metric);

    if (is_metric) {
      // KG
      console.log('sfdhsfhd', measurment);
      if (measurment === 'weight') {
        errorr =
          WEIGHT_RANGE.kg.min < value && value <= WEIGHT_RANGE.kg.max
            ? ''
            : WEIGHT_RANGE.kg.errorr;
        console.log('sfdhsfhd', WEIGHT_RANGE.kg.min < value);
        console.log('sfdhsfhd', value <= WEIGHT_RANGE.kg.max);
      }
    } else {
      // LBS
      if (measurment === 'weight') {
        errorr =
          WEIGHT_RANGE.lbs.min < value <= WEIGHT_RANGE.lbs.max
            ? ''
            : WEIGHT_RANGE.lbs.errorr;
      }
    }
    console.log('->>>>>', errorr);
    console.log('sbjdjcjdbbv');

    setError((err) => ({
      ...err,
      weightError: errorr,
    }));
  };

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

    console.log('weight', value);
    // console.log('bp_diastolic', lowValue);
    console.log('date_entry', dateAndtime);
    try {
      setIsLoading(true);
      const response = await userService.createWeight({
        medical: {
          weight: value,
          is_metric: 'true',
          date_entry: dateAndtime,
        },
      });
      console.log('weight submitted ', response.data);
      alert('weight submitted ');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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

  return (
    <TitleWithBackWhiteBgLayout title="Weight">
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            // borderWidth: 5,
            marginBottom: heightToDp(25),
          }}
        >
          {/* <WeightChooser
            height={15}
            label="Your Reading"
            textAlign="right"
            placeholder={'0.0'}
            onChangeText={onChangeText}
            value={value}
            selectedType={selectedTypeWeight}
            setSelectedType={setSelectedTypeWeight}
            setValue={setValue}
          /> */}
          <InputWithUnits
            title="Weight"
            placeholder="0.0"
            units={['kg', 'lbs']}
            unit={bodyMeasurment.is_metric ? 'kg' : 'lbs'}
            value={bodyMeasurment.weight.toString()}
            onChangeText={(val: any) => handleChange(val, 'weight')}
            onUnitChange={handleUnitChange}
            error={error.weightError}
            onBlur={() => {
              console.log('WHyyy?');
              measurmentValidator(
                bodyMeasurment.is_metric,
                'weight',
                bodyMeasurment.weight
              );
            }}
          />
          {validation ? (
            <Text style={styles.errorMessage}>
              Please enter a valid weight between 0 - 200 kg
            </Text>
          ) : null}
          {validation2 ? (
            <Text style={styles.errorMessage}>
              Please enter a valid weight between 0 - 400 lbs
            </Text>
          ) : null}

          {!validation && !validation2 && value ? (
            <>
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
          title={'Add'}
          disabled={validation || validation2 || !value ? true : false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default Weight;
