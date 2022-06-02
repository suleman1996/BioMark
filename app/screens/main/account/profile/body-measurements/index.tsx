/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import { ActivityIndicator } from 'components';
import InputWithUnits from 'components/input-with-units';
import { cmToFeet, feetToCm } from 'utils/functions/measurments';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';

import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

import makeStyles from './styles';

const BodyMeasurementScreen = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyMeasurment, setBodyMeasurment] = useState({
    height: '0',
    weight: 0,
    is_metric: true,
  });
  const [error, setError] = useState({
    heightError: '',
    weightError: '',
  });

  React.useEffect(() => {
    bodyMeasurements();
  }, []);

  useEffect(() => {
    if (!bodyMeasurment.is_metric) {
      setBodyMeasurment((prev) => ({
        ...prev,
        weight: Number((prev.weight * 2.205).toFixed(1)),
        height: cmToFeet(prev.height),
      }));
    } else {
      setBodyMeasurment((prev) => ({
        ...prev,
        weight: Number((prev.weight * (1 / 2.205)).toFixed(1)),
        height: feetToCm(bodyMeasurment.height),
      }));
    }
  }, [bodyMeasurment.is_metric]);

  const bodyMeasurements = async () => {
    try {
      setIsLoading(true);
      const { height_attr, weight_attr, is_metric }: any =
        await userService.getBodyMeasurements();

      if (is_metric) {
        setBodyMeasurment({
          height: height_attr,
          weight: weight_attr,
          is_metric,
        });
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (err.errMsg.status == false) {
        showMessage({
          message: err.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: err.errMsg,
          type: 'danger',
        });
      }
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await userService.bodyMeasurement({
        medical: {
          ...bodyMeasurment,
        },
      });
      navigate(SCREENS.EDIT_PROFILE);
      console.log('response measureeeeeement', response);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (err.errMsg.status == false) {
        showMessage({
          message: err.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: err.errMsg,
          type: 'danger',
        });
      }
    }
  };
  const handleUnitChange = (selectedUnit: string) => {
    setBodyMeasurment((prev: any) => ({
      ...prev,
      is_metric: ['kg', 'cm'].includes(selectedUnit) ? true : false,
    }));
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

  return (
    <TitleWithBackLayout title="Body Measurements">
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            marginBottom: heightToDp(37),
          }}
        >
          <InputWithUnits
            title="Height"
            placeholder="0'0*.0"
            units={['cm', 'ft/in']}
            unit={bodyMeasurment.is_metric ? 'cm' : 'ft/in'}
            value={bodyMeasurment.height}
            onChangeText={(val: any) => handleChange(val, 'height')}
            onUnitChange={handleUnitChange}
            error={error.heightError}
            onBlur={() => console.log(bodyMeasurment.height)}
          />
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
        </View>

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={'Save & Continue'}
          disabled={
            bodyMeasurment.height == '' || bodyMeasurment.weight == ''
              ? true
              : false
          }
        />
      </ScrollView>
    </TitleWithBackLayout>
  );
};
export default BodyMeasurementScreen;
