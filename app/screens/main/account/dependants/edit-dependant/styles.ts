import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalStyles } from 'utils/theme/global-styles';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    cardContainer: {
      marginHorizontal: widthToDp(4),
      marginVertical: widthToDp(3),
      flex: 1,
      backgroundColor: colors.white,
      borderRadius: widthToDp(3),
      ...GlobalStyles(colors).shadow,
      paddingHorizontal: widthToDp(3),
      paddingVertical: widthToDp(2),
    },
    headerText: {
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
      fontSize: responsiveFontSize(21),
    },
    label: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
      marginTop: heightToDp(2),
    },
    bottomBtnContainer: {
      marginTop: heightToDp(4),
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
