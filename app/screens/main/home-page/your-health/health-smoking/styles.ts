import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    navBar: {
      backgroundColor: colors.blue,
      height: 80,
      width: '100%',
    },
    backIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 30,
    },
    innerContainer: {
      alignItems: 'center',
    },
    topBg: {
      width: '100%',
      height: 60,
      position: 'absolute',
      top: 0,
      backgroundColor: colors.blue,
    },
    smokingPack: {
      borderRadius: 10,
      marginTop: 5,
      paddingVertical: 10,
      width: '100%',
      backgroundColor: colors.white,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 3,
    },
    upperLeftText: {
      fontSize: 16,
      fontFamily: fonts.mulishExtraBold,
      color: colors.black,
    },
    upperRightText: {
      fontSize: 16,
      fontFamily: fonts.mulishExtraBold,
      color: colors.dullRed,
    },
    midText: {
      fontSize: 45,
      fontFamily: fonts.mulishExtraBold,
      color: colors.dullRed,
    },
    lowerText: {
      fontSize: 15,
      fontFamily: fonts.mulishBold,
      color: colors.heading,
    },
    lowerContainer: {
      paddingHorizontal: 20,
      // alignItems: 'center',
    },
    calHeading: {
      fontSize: 18,
      color: colors.heading,
      fontFamily: fonts.mulishExtraBold,
    },
    calText: {
      fontSize: 15,
      fontFamily: fonts.mulishBold,
      color: colors.heading,
      marginVertical: 5,
    },
    refrences: {
      paddingHorizontal: 20,
      marginTop: 10,
    },
    refrenceHeading: {
      fontSize: 13,
      fontFamily: fonts.mulishExtraBold,
      color: colors.smoke,
    },
    refrenceSubHeading: {
      fontSize: 12,
      fontFamily: fonts.mulishSemiBold,
      color: colors.smoke,
    },
  });
export default styles;
