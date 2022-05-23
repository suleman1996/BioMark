import { StyleSheet } from 'react-native';

import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
    },
    rightText: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(20),
      marginLeft: widthToDp(4),
      lineHeight: responsiveFontSize(30),
    },
    checkbox: {
      padding: 1,
    },
  });
export default makeStyles;
