import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      marginHorizontal: 15,
      marginVertical: 10,
    },
    headingStyle: {
      fontFamily: fonts.mulishBold,
      fontSize: 18,
      color: colors.heading,
    },
    medicationBox: {
      alignItems: 'center',
      borderWidth: 0.1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginTop: 18,
    },
    medicationBoxSuccess: {
      alignItems: 'center',
      borderWidth: 0.1,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      backgroundColor: colors.greenOpacity,
      marginTop: 18,
    },
    timeText: {
      fontFamily: fonts.bold,
      fontSize: 25,
      color: colors.shineBlue,
    },
    timeTextSuccess: {
      fontFamily: fonts.bold,
      fontSize: 25,
      color: colors.greenDark,
    },
    timeView: {
      borderBottomWidth: 0.2,
      borderBottomColor: colors.darkGray,
      width: '100%',
      alignItems: 'center',
      padding: 5,
    },
    medicineText: {
      fontFamily: fonts.mulishRegular,
      color: colors.primary,
      fontSize: 17,
      marginLeft: 10,
    },
    medicineTextSuccess: {
      fontFamily: fonts.mulishRegular,
      color: colors.greenDark,
      fontSize: 17,
      marginLeft: 10,
    },
    checkboxView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 10,
    },
    errorContainer: {
      width: '100%',
      height: 30,
      paddingVertical: heightToDp(0.3),
      paddingHorizontal: widthToDp(4),
      backgroundColor: colors.red,
      borderBottomLeftRadius: widthToDp(2),
      borderBottomRightRadius: widthToDp(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorText: {
      color: colors.white,
      fontFamily: fonts.mulishLight,
      fontSize: 12,
      paddingLeft: widthToDp(3),
    },
    successContainer: {
      width: '100%',
      height: 30,
      paddingVertical: heightToDp(0.3),
      paddingHorizontal: widthToDp(4),
      backgroundColor: colors.greenDark,
      borderBottomLeftRadius: widthToDp(2),
      borderBottomRightRadius: widthToDp(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    greenText: {
      color: colors.white,
      fontFamily: fonts.mulishLight,
      fontSize: 13,
      paddingLeft: widthToDp(3),
    },
  });
export default styles;
