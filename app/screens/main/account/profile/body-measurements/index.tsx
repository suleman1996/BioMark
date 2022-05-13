import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { HeightChooser, WeightChooser } from 'components/higher-order';
import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';

import { styles } from './styles';
import { ActivityIndicator } from 'components/';

const BodyMeasurementScreen = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [selectedType, setSelectedType] = useState(2);
  const [selectedTypeWeight, setSelectedTypeWeight] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeText = (values) => {
    selectedType == '1'
      ? setValue((values / 2.54).toFixed(4).toString())
      : setValue(values);
    // setValue(value);
  };
  const onChangeText2 = (values) => {
    // setValue2(values);

    selectedTypeWeight == '1'
      ? setValue2((values * 2.2).toFixed(4).toString())
      : setValue2(values);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await userService.bodyMeasurement({
        medical: {
          height: value,
          weight: value2,
          is_metric: true,
        },
      });
      console.log('measurement successful', response.data);
      navigate(SCREENS.EDIT_PROFILE);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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

  return (
    <TitleWithBackLayout title="Body Measurements">
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            // borderWidth: 5,
            marginBottom: heightToDp(37),
          }}
        >
          <HeightChooser
            height={15}
            label="Height"
            textAlign="right"
            placeholder={'0'}
            onChangeText={onChangeText}
            value={value}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setValue={setValue}
          />
          <WeightChooser
            height={15}
            label="Weight"
            textAlign="right"
            placeholder={'0.0'}
            onChangeText={onChangeText2}
            value={value2}
            selectedType={selectedTypeWeight}
            setSelectedType={setSelectedTypeWeight}
            setValue={setValue2}
          />
        </View>

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={'Save & Continue'}
          disabled={value == '' || value2 == '' ? true : false}
        />
      </ScrollView>
    </TitleWithBackLayout>
  );
};

export default BodyMeasurementScreen;
