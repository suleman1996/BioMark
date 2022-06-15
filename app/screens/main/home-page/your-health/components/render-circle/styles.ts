import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    circle: {
      height: 60,
      width: 60,
      borderRadius: 30,
      backgroundColor: colors.white,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleText: {
      marginTop: 10,
      fontFamily: fonts.mulishBold,
      color: colors.heading,
      fontSize: 15,
      // fontWeight: 'bold',
    },
  });
export default makeStyles;
