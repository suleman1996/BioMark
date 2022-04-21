import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightToDp} from '../../../../../../utils/functions/responsiveDimentions';
import {responsiveFontSize} from '../../../../../../utils/functions/responsiveText';
import {GlobalColors} from '../../../../../../utils/theme/globalColors';
import {GlobalFonts} from '../../../../../../utils/theme/fonts';

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 8,
    borderRadius: 3,
  },
  radioText: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.light,
  },
  label: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalColors.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),

    fontWeight: 'bold',
  },
});

export default styles;
