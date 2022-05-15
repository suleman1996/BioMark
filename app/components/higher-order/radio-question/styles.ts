import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    radioContainer: {
      flexDirection: 'row',
    },
    container: {
      paddingHorizontal: widthToDp(4),
    },
    qText: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.extraBold,
      color: colors.darkPrimary,
      marginTop: heightToDp(2),
    },
    singleRadioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: widthToDp(3),
    },
    radioLabel: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.regular,
    },
  });
export default makeStyles;
