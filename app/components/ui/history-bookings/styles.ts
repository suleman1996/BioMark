import { StyleSheet } from 'react-native';
// import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    singleItemContainer: {
      padding: widthToDp(3),
      marginTop: heightToDp(2),
      marginHorizontal: widthToDp(6),
      backgroundColor: colors.white,
      borderRadius: widthToDp(2),
      borderWidth: 0.2,
    },
    whoIsText: {
      fontFamily: GlobalFonts.bold,
      fontSize: responsiveFontSize(20),
      color: colors.darkPrimary,
    },
    bookingId: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(18),
      color: colors.darkPrimary,
    },
    idText: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(18),
      color: colors.inactive,
    },
    locationText: {
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(19),
      color: colors.black,
    },
    dateandtimeText: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(19),
      color: colors.darkPrimary,
    },
    cityNameText: {
      fontFamily: GlobalFonts.extraLight,
      fontSize: responsiveFontSize(20),
      color: colors.darkPrimary,
    },
    cancelledText: {
      fontFamily: GlobalFonts.extraLight,
      fontSize: responsiveFontSize(20),
      color: colors.red,
    },
    button: {
      paddingHorizontal: widthToDp(5),
      paddingVertical: widthToDp(2),
      borderColor: colors.darkPrimary,
      borderWidth: 1,
      borderRadius: widthToDp(3),
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      width: widthToDp(100),
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: heightToDp(2),
      backgroundColor: colors.white,
    },
    confirmedContainer: {
      backgroundColor: colors.inputBg,
      flexDirection: 'row',
      paddingHorizontal: widthToDp(2),
      paddingVertical: widthToDp(1),
      borderRadius: widthToDp(1.5),
      alignItems: 'center',
    },
    confirmedDot: {
      width: widthToDp(2),
      height: widthToDp(2),
      borderRadius: widthToDp(2),
      backgroundColor: colors.lightYellow,
      marginRight: widthToDp(1),
    },
    confirmedText: {
      fontFamily: GlobalFonts.extraLight,
      fontSize: responsiveFontSize(17),
      color: colors.inactive,
    },
    readyContainer: {
      backgroundColor: colors.inputBg,
      flexDirection: 'row',
      paddingHorizontal: widthToDp(2),
      paddingVertical: widthToDp(1),
      borderRadius: widthToDp(1.5),
      alignItems: 'center',
    },
    readyDot: {
      width: widthToDp(2),
      height: widthToDp(2),
      borderRadius: widthToDp(2),
      backgroundColor: colors.lightGreen,
      marginRight: widthToDp(1),
    },
  });

export default makeStyles;
