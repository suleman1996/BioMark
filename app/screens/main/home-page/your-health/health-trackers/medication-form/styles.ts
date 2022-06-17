import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    outerContainer: { backgroundColor: 'white', flex: 1 },
    container: {
      flex: 1,
      // height: '100%',
      backgroundColor: 'white',
      paddingHorizontal: 25,
    },
    textStyle: {
      fontSize: responsiveFontSize(22),
      fontFamily: fonts.mulishSemiBold,
      marginTop: 15,
      color: colors.shineBlue,
    },
    gradientButton: {
      marginVertical: 15,
      marginHorizontal: 20,
      marginTop: 30,
    },
    dropDownMenu: {
      marginVertical: 8,
    },
    subText: {
      fontSize: 17,
      fontFamily: fonts.regular,
      // color: colors.black,
    },
    unitText: {
      fontFamily: fonts.regular,
      color: colors.shineBlue,
      fontSize: 18,
    },
    dosageView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
export default makeStyles;
