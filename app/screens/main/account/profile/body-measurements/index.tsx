import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeightChooserComponent from '../../../../../components/higher-order/height-chooser/index';
import WeightChooserComponent from '../../../../../components/higher-order/weight-chooser';
import {
  heightToDp,
  widthToDp
} from '../../../../../utils/functions/responsiveDimentions';
import Button from '../../../../../components/button/button';
import { GlobalColors } from '../../../../../utils/theme/globalColors';
import ButtonWithShadowContainer from '../../../../../components/base/button-with-shadow-container/index';
import TitleWithBackLayout from '../../../../../components/layouts/back-with-title/index';
import { responsiveFontSize } from '../../../../../utils/functions/responsiveText';
import { GlobalFonts } from '../../../../../utils/theme/fonts';

const BodyMeasurementScreen = () => {
  const [value, setValue] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  return (
    <TitleWithBackLayout title="Personal Information">
      <ScrollView style={styles.container}>
        <HeightChooserComponent height={15} label="Height" textAlign="right" onChangeText={(text)=>setHeight(text)}/>
        <WeightChooserComponent height={15} label="Weight" textAlign="right" onChangeText={(text)=>setWeight(text)}/>
      </ScrollView>
      <Button
        disabled={height.length > 0 && weight.length > 0 ? false : true}
        title="Save & Continue" />
      {/* <ButtonWithShadowContainer /> */}
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
