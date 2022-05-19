import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginTop: heightToDp(2),
    },
    label: {
      fontSize: responsiveFontSize(25),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
    },
    inputLabel: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
    },
  });
export default makeStyles;
