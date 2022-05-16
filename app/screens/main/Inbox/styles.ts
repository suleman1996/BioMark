import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      // flex: 0,
      backgroundColor: colors.whiteColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: heightToDp(10),
    },
    text: {
      fontFamily: fonts.light,
      fontSize: 18,
    },
    pagerView: {
      width: widthToDp(92),
      height: '100%',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: heightToDp(1.5),
      marginBottom: heightToDp(10),
      // flex: 1
    },
    tabNameContainer: {
      width: widthToDp(92),
      flexDirection: 'row',
      paddingTop: heightToDp(2),
    },
    tab: {
      marginRight: widthToDp(3),
      paddingHorizontal: widthToDp(4),
      alignItems: 'center',
      borderColor: colors.darkPrimary,
    },
    tabText: {
      fontFamily: GlobalFonts.bold,
      color: colors.darkPrimary,
      fontSize: responsiveFontSize(22),
    },
    previousNotificationContainer: {
      width: widthToDp(92),
      borderWidth: 1.2,
      borderColor: colors.gray,
      borderRadius: widthToDp(4),
      flex: 1,
      alignItems: 'center',
    },
    othersNotificationContainer: {
      width: widthToDp(92),
      borderWidth: 1.2,
      borderColor: colors.gray,
      borderRadius: widthToDp(4),
      flex: 1,
      alignItems: 'center',
    },
    blackLine: {
      width: widthToDp(86),
      height: heightToDp(0.15),
      backgroundColor: colors.black,
      marginTop: heightToDp(2),
      marginBottom: heightToDp(2),
    },
    prevHeaderText: {
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.bold,
      fontSize: responsiveFontSize(23),
    },
    headerContainer: {
      width: widthToDp(86),
    },
    readMoreContainer: {
      width: widthToDp(86),
      paddingHorizontal: widthToDp(6),
      marginBottom: heightToDp(2),
    },
    readMoreText: {
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(23),
    },
  });
export default makeStyles;
