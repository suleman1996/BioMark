/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import { ActivityIndicator, InputWithUnits } from 'components';
import {
  cmToFeet,
  feetToCm,
  measurementValidator,
} from 'utils/functions/measurments';
import SCREENS from 'navigation/constants/index';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

const BodyMeasurementScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const styles = makeStyles(colors);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyMeasurment, setBodyMeasurment] = useState({
    height: '',
    weight: '',
    is_metric: true,
  });
  const [error, setError] = useState({
    height: '',
    weight: '',
  });

  React.useEffect(() => {
    bodyMeasurements();
  }, []);

  useEffect(() => {
    console.log('METRIC CHANGED');
    if (bodyMeasurment.dont_run) {
      console.log(bodyMeasurment.dont_run);
      setBodyMeasurment((prev) => ({ ...prev, dont_run: false }));
      return;
    }
    if (!bodyMeasurment.height || !bodyMeasurment.weight) return;
    if (!bodyMeasurment.is_metric) {
      setBodyMeasurment((prev) => ({
        ...prev,
        weight: Number((prev.weight * 2.205).toFixed(1)),
        height: !isNaN(+prev.height) ? cmToFeet(prev.height) : prev.height,
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
      console.log(
        'heigh ',
        height_attr,
        ' Weight ',
        weight_attr,
        ' is_metric ',
        is_metric
      );

      setBodyMeasurment({
        height: height_attr,
        weight: weight_attr,
        is_metric,
        dont_run: is_metric ? false : true,
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
        // } else if (err.errMsg.status == false) {
        //   showMessage({
        //     message: err.errMsg.data.error,
        //     type: 'danger',
        //   });
        // } else {
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
      await userService.bodyMeasurement({
        medical: {
          ...bodyMeasurment,
        },
      });
      // navigate(SCREENS.EDIT_PROFILE);
      {
        route?.params?.back
          ? navigation.navigate(SCREENS.YOUR_HEALTH)
          : navigation.goBack();
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
  const handleUnitChange = (selectedUnit: string) => {
    setBodyMeasurment((prev: any) => ({
      ...prev,
      is_metric: ['kg', 'cm'].includes(selectedUnit) ? true : false,
    }));
  };

  const handleChange = (value: number, key: string) => {
    setBodyMeasurment((prev: any) => ({ ...prev, [key]: value }));
    setError((err) => ({
      ...err,
      [key]: measurementValidator(bodyMeasurment.is_metric, key, value, t),
    }));
  };
  console.log(bodyMeasurment);
  return (
    <TitleWithBackLayout title={t('pages.bodyMeasurements.title')}>
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            marginBottom: heightToDp(37),
          }}
        >
          <InputWithUnits
            title={t('pages.bodyMeasurements.yourReadingHeight')}
            placeholder="0.0"
            units={['cm', 'ft/in']}
            unit={bodyMeasurment.is_metric ? 'cm' : 'ft/in'}
            value={bodyMeasurment.height}
            onChangeText={(val: any) => handleChange(val, 'height')}
            onUnitChange={handleUnitChange}
            error={error.height}
            onBlur={() => {
              setError({
                ...error,
                height: measurementValidator(
                  bodyMeasurment.is_metric,
                  'height',
                  bodyMeasurment.height,
                  t
                ),
              });
            }}
          />

          <InputWithUnits
            title={t('pages.bodyMeasurements.yourReadingWeight')}
            placeholder="0.0"
            units={['kg', 'lbs']}
            unit={bodyMeasurment.is_metric ? 'kg' : 'lbs'}
            value={bodyMeasurment?.weight?.toString()}
            onChangeText={(val: any) => handleChange(val, 'weight')}
            onUnitChange={handleUnitChange}
            error={error.weight}
            onBlur={() => {
              setError({
                ...error,
                weight: measurementValidator(
                  bodyMeasurment.is_metric,
                  'weight',
                  bodyMeasurment.weight,
                  t
                ),
              });
            }}
          />
        </View>
      </ScrollView>
      <ButtonWithShadowContainer
        onPress={onSubmit}
        title={t('pages.medicalHistory.continue')}
        disabled={
          bodyMeasurment.height == '' || bodyMeasurment.weight == ''
            ? true
            : false
        }
      />
    </TitleWithBackLayout>
  );
};
export default BodyMeasurementScreen;
