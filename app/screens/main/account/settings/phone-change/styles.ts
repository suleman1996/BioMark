import { StyleSheet } from 'react-native';

import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: widthToDp(6),
      paddingVertical: widthToDp(1),
      backgroundColor: colors.white,
    },
    phoneText: {
      fontSize: responsiveFontSize(23),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
    },
  });
export default makeStyles;
