import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';
// import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    card: {
      width: widthToDp(90),
      borderWidth: 1,
      borderColor: colors.inputBg,
      borderRadius: widthToDp(3),
      backgroundColor: colors.white,
      paddingHorizontal: widthToDp(3),
      paddingVertical: widthToDp(2),
      marginTop: heightToDp(2),
    },
    headerText: {
      fontFamily: fonts.bold,
      fontSize: responsiveFontSize(18),
      color: colors.black,
    },
    question: {
      fontFamily: fonts.medium,
      fontSize: responsiveFontSize(17),
      color: colors.darkPrimary,
      marginBottom: -heightToDp(0.3),
    },
    answerText: {
      fontFamily: fonts.light,
      fontSize: responsiveFontSize(16),
      color: colors.black,
      marginTop: heightToDp(1),
    },
  });

export default makeStyles;
