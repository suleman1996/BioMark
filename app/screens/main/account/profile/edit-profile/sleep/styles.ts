import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GlobalColors } from '../../../../../../utils/theme/global-colors';
import { GlobalFonts } from '../../../../../../utils/theme/fonts';
import { responsiveFontSize } from '../../../../../../utils/functions/responsive-text';
import {
  heightToDp,
  widthToDp,
} from '../../../../../../utils/functions/responsive-dimensions';

const styles = StyleSheet.create({
  heading: {
    fontFamily: GlobalFonts.semiBold,
    fontSize: responsiveFontSize(18),
    color: GlobalColors.heading,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: responsiveFontSize(20),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
    marginHorizontal: heightToDp(5),
    fontWeight: 'bold',
  },
  container2: {
    marginTop: 10,
    borderBottomWidth: 0,
    borderColor: GlobalColors.darkPrimary,
    backgroundColor: '#EBEFF2',
    height: 50,
  },
});

export default styles;
