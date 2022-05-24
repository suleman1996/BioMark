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
      marginBottom: 20,
    },
    buttonContainer: {
      width: '100%',
      marginTop: 30,
    },
  });
export default styles;
