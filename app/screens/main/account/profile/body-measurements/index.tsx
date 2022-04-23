import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import HeightChooserComponent from '../../../../../components/higher-order/height-chooser/index';
import WeightChooserComponent from '../../../../../components/higher-order/weight-chooser';
import {
  heightToDp,
  widthToDp,
} from '../../../../../utils/functions/responsiveDimentions';
import Button from '../../../../../components/button/button';
import {GlobalColors} from '../../../../../utils/theme/globalColors';
import ButtonWithShadowContainer from '../../../../../components/base/button-with-shadow-container/index';
import TitleWithBackLayout from '../../../../../components/layouts/back-with-title/index';
import {responsiveFontSize} from '../../../../../utils/functions/responsiveText';
import {GlobalFonts} from '../../../../../utils/theme/fonts';
import {goBack} from '../../../../../services/navRef';

const BodyMeasurementScreen = () => {
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const onChangetext = (values = 30) => {
    setValue(values);
  };
  const onChangetext2 = (values = 30) => {
    setValue2(values);
  };

  return (
    <TitleWithBackLayout title="Body Measurements">
      <ScrollView style={styles.container}>
        <HeightChooserComponent
          height={15}
          label="Height"
          textAlign="right"
          placeholder={''}
          onChangeText={onChangetext}
          value={value}
        />
        <WeightChooserComponent
          height={15}
          label="Weight"
          textAlign="right"
          placeholder={undefined}
          onChangeText={onChangetext2}
          value={value2}
        />
      </ScrollView>
      <ButtonWithShadowContainer
        onPress={() => {
          goBack();
        }}
        title={'Save & Continue'}
      />
      {/* <Button
        title="Save & Continue"
        onPress={() => {
          goBack();
        }}
      /> */}
    </TitleWithBackLayout>
  );
};

export default BodyMeasurementScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.white,
    flex: 1,
    paddingHorizontal: widthToDp(4),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.light,
  },
});
