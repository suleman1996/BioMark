import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { HeightChooser, WeightChooser } from 'components/higher-order';
import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

import { styles } from './styles';

const BodyMeasurementScreen = () => {
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const onChangeText = (values = 30) => {
    setValue(values);
  };
  const onChangeText2 = (values = 30) => {
    setValue2(values);
  };

  const onSubmit = async () => {
    try {
      const response = await userService.bodyMeasurement({
        medical: {
          height: value,
          weight: value2,
          is_metric: true,
        },
      });
      console.log('measurement successful', response.data);
      navigate(SCREENS.EDIT_PROFILE);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TitleWithBackLayout title="Body Measurements">
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
          />
          <WeightChooser
            height={15}
            label="Weight"
            textAlign="right"
            placeholder={'0.0'}
            onChangeText={onChangeText2}
            value={value2}
          />
        </View>
        {/* <ButtonWithShadowContainer
          // onPress={() => {
          //   goBack();
          // }}
          title={'Save & Continue'}
        /> */}
        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={'Save & Continue'}
        />
      </ScrollView>
    </TitleWithBackLayout>
  );
};

export default BodyMeasurementScreen;
