/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';

const styles = (colors: any) =>
  StyleSheet.create({
    innerContainer: {
      marginHorizontal: 30,
    },
    navTop: {
      backgroundColor: 'red',
    },
    firstHeading: {
      fontSize: 25,
      fontFamily: fonts.mulishBold,
      color: colors.shineBlue,
      marginVertical: 20,
    },
    subHeading: {
      fontSize: 20,
      fontFamily: fonts.mulishRegular,
      color: colors.heading,
    },
    secondHeading: {
      fontSize: 17,
      fontFamily: fonts.mulishSemiBold,
      color: colors.shineBlue,
      marginTop: 20,
    },
    buttonContainer: {
      width: '100%',
      marginTop: 30,
      marginBottom: 20,
    },
  });
export default styles;
