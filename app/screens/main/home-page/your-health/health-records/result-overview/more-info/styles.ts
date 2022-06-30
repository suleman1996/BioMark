import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
// import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // padding: 15,
    },
    heading: {
      fontFamily: fonts.regular,
      fontSize: 18,
      color: colors.heading,
      fontWeight: '500',
    },
    innerContainer: {
      flex: 1,
      padding: 15,
      backgroundColor: colors.white,
      marginTop: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      margin: 15,
    },
    lastResult: {
      padding: 10,
      backgroundColor: colors.white,
      marginTop: 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      paddingVertical: 20,
    },
    divider: {
      height: 0.5,
      width: '100%',
      backgroundColor: '#3D3D3D40',
      marginVertical: 5,
    },
    definationView: {
      padding: 15,
      backgroundColor: colors.white,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      borderRadius: 5,
    },
    definationText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.heading,
      textAlign: 'justify',
    },
    gestureView: {
      flexDirection: 'row-reverse',
      width: '100%',
    },
  });
export default styles;
