import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    recordKeepingView: {
      //   height: 100,
      marginHorizontal: 5,
      alignItems: 'center',
      paddingTop: 15,
      backgroundColor: colors.blue,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    recordKeepinText: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.white,
    },
    date: {
      fontSize: 12,
      fontFamily: fonts.light,
      marginBottom: 10,
      color: colors.heading,
    },
  });
export default makeStyles;
