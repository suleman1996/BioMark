import { StyleSheet } from 'react-native';

// import { GlobalFonts } from 'utils/theme/fonts';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    renderHealthView: {
      height: 110,
      width: 100,
      padding: 15,
      backgroundColor: colors.white,
      justifyContent: 'center',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 5,
      //   alignItems: 'center',
    },
    healthTrackerHeading: {
      //   fontFamily: fonts.bold,
      fontFamily: fonts.mulishExtraBold,
      fontSize: 12,
      color: colors.lightDark,
      textAlign: 'center',
      marginBottom: 5,
    },
    healthTrackerSubHeading: {
      fontWeight: 'bold',
      fontSize: 17,
      marginBottom: 5,
      // color: colors.danger,
      textAlign: 'center',
    },
    healthTrackerValueText: {
      fontWeight: fonts.mulishSemiBold,
      fontSize: 15,
      color: colors.danger,
      textAlign: 'center',
    },
  });
export default makeStyles;
