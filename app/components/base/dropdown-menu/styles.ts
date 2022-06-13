import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    label: {
      fontSize: responsiveFontSize(22),
      fontFamily: fonts.mulishSemiBold,
      marginTop: 15,
      marginBottom: 10,
      color: colors.shineBlue,
    },
    errorContainer: {
      width: '100%',
      paddingVertical: heightToDp(0.3),
      paddingHorizontal: widthToDp(4),
      backgroundColor: colors.red,
      borderBottomLeftRadius: widthToDp(2),
      borderBottomRightRadius: widthToDp(2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    errorText: {
      color: colors.white,
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(14),
      paddingLeft: widthToDp(3),
    },
  });
export default makeStyles;
