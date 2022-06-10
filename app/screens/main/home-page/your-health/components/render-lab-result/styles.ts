import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    resultStatusView: {
      marginTop: 20,
      //   height: 100,
      backgroundColor: colors.white,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      borderRadius: 10,
      marginHorizontal: 5,
      padding: 5,
    },
    resultStatus: {
      fontFamily: fonts.regular,
      fontWeight: '900',
      fontSize: 16,
      color: colors.heading,
    },
    barcode: {
      fontFamily: fonts.light,
      fontSize: 13,
      color: colors.heading,
      textAlign: 'center',
    },
  });
export default makeStyles;
