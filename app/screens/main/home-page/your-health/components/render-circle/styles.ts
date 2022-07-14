import fonts from 'assets/fonts';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthToDp } from 'utils/functions/responsive-dimensions';

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
    circleBtn: {
      backgroundColor: 'white',
      borderRadius: 300,
      width: widthToDp(14),
      height: widthToDp(14),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: Platform.OS == 'ios' ? 'visible' : 'hidden',
    },
    healthText: {
      fontFamily: fonts.bold,
      fontSize: RFValue(15),
      color: colors.heading,
    },
    btn: {
      width: widthToDp(14),
      height: widthToDp(14),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 300,
    },
  });
export default makeStyles;
