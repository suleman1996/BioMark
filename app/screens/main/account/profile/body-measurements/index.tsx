/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import { ActivityIndicator } from 'components';
import InputWithUnits from 'components/input-with-units';

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

  React.useEffect(() => {
    bodyMeasurements();
  }, []);

  useEffect(() => {
    if (!bodyMeasurment.is_metric) {
      setBodyMeasurment((prev) => ({
        ...prev,
        weight: Number((prev.weight * 2.205).toFixed(1)),
        height: toFeet(prev.height),
      }));
    } else {
      setBodyMeasurment((prev) => ({
        ...prev,
        weight: Number((prev.weight * (1 / 2.205)).toFixed(1)),
        height: testConversion(bodyMeasurment.height),
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
    } catch (error) {
      setIsLoading(false);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
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

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await userService.bodyMeasurement({
        medical: {
          ...bodyMeasurment,
        },
      });
      navigate(SCREENS.EDIT_PROFILE);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
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
  const handleUnitChange = (selectedUnit: string) => {
    setBodyMeasurment((prev: any) => ({
      ...prev,
      is_metric: ['kg', 'cm'].includes(selectedUnit) ? true : false,
    }));
  };

  const handleChange = (value: number, key: string) => {
    setBodyMeasurment((prev: any) => ({ ...prev, [key]: value }));
  };

  function toFeet(n) {
    var realFeet = (n * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = (realFeet - feet) * 12;
    return feet + "'" + inches.toFixed(1);
  }

  const testConversion = (feets: string) => {
    const [feet, inches] = feets.toString().split("'");
    let cmTotal = 0;
    if (feet) {
      cmTotal += feet * 30.48;
    }
    if (inches) {
      cmTotal += inches * 2.54;
    }
    return cmTotal.toFixed(1).toString();
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
          />
          <InputWithUnits
            title="Weight"
            placeholder="0.0"
            units={['kg', 'lbs']}
            unit={bodyMeasurment.is_metric ? 'kg' : 'lbs'}
            value={bodyMeasurment.weight.toString()}
            onChangeText={(val: any) => handleChange(val, 'weight')}
            onUnitChange={handleUnitChange}
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
