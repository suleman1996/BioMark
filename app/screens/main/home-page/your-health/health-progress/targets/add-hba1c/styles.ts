/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';

const styles = (colors: any) =>
  StyleSheet.create({
    innerContainer: {
      marginHorizontal: 30,
    },
    navTop: {
      backgroundColor: 'red',
    },
    firstHeading: {
      fontSize: responsiveFontSize(25),
      fontFamily: fonts.mulishBold,
      color: colors.shineBlue,
      marginVertical: 20,
    },
    subHeading: {
      fontSize: responsiveFontSize(17),
      fontFamily: fonts.mulishRegular,
      color: colors.heading,
      marginBottom: 20,
    },
    buttonContainer: {
      width: '80%',
      marginVertical: 30,
      alignSelf: 'center',
    },
    inputLabelStyle: {
      color: colors.shineBlue,
      paddingLeft: 0,
      marginLeft: 0,
      marginTop: 20,
    },
  });
export default styles;
