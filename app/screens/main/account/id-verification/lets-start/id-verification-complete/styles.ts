import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text1: {
      fontFamily: fonts.bold,
      fontSize: 35,
      color: colors.heading,
    },
    text2: {
      fontFamily: fonts.mulishSemiBold,
      fontSize: 15,
      color: colors.black,
      paddingHorizontal: 10,
      textAlign: 'center',
    },
    image: {
      width: widthToDp(75),
      marginVertical: 20,
    },
    backBtnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 10,
      left: 10,
    },
    backText: {
      fontFamily: fonts.mulishSemiBold,
      fontSize: responsiveFontSize(20),
      color: colors.darkPrimary,
    },
  });
export default styles;
