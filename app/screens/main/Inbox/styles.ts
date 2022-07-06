import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      // flex: 0,
      backgroundColor: colors.white,
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
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: heightToDp(1.5),

      // flex: 1
    },
    tabNameContainer: {
      width: widthToDp(92),
      flexDirection: 'row',
      paddingTop: heightToDp(2),
      backgroundColor: colors.white,
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
      fontSize: responsiveFontSize(18),
    },
    previousNotificationContainer: {
      width: widthToDp(92),
      borderWidth: 1.2,
      borderColor: colors.gray,
      borderRadius: widthToDp(4),
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
      height: heightToDp(0.05),
      backgroundColor: colors.black,
      marginBottom: heightToDp(1),
    },
    prevHeaderText: {
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.bold,
      fontSize: responsiveFontSize(21),
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
    emptyListText: {
      color: colors.disable,
      fontFamily: fonts.mulishRegular,
      paddingBottom: 5,
    },
  });
export default makeStyles;
