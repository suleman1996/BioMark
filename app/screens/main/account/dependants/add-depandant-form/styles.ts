import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalStyles } from 'utils/theme/global-styles';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    parent: {
      borderColor: colors.inputBg,
      borderWidth: 2,
      borderRadius: widthToDp(3),
      marginBottom: heightToDp(1.5),
      width: widthToDp(88),
      padding: widthToDp(3),
      marginTop: heightToDp(2),
    },
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
  });
export default makeStyles;
