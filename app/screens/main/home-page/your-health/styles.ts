import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    navBar: {
      backgroundColor: colors.blue,
      height: 85,
      width: '100%',
    },
    navHeading: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.white,
      paddingLeft: 21,
      paddingTop: 10,
      paddingBottom: 10,
    },
    navSearch: {
      width: '100%',
      marginHorizontal: 20,
    },
    navSearchInner: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
    },
    containerBody: { flex: 1, paddingHorizontal: 15, paddingTop: 40 },
    headingText: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.heading,
    },
    healthRiskView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 5,
    },
    renderHealthRisk: {
      height: 32,
      width: 32,
      borderRadius: 16,

      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      backgroundColor: colors.dangerRed,
      height: 10,
      width: 10,
      borderRadius: 7.5,
      //   position: 'absolute',
      right: 13,
      borderWidth: 1,
      borderColor: colors.white,
    },
    healthTrackerHeading: {
      //   fontFamily: fonts.bold,
      fontWeight: 'bold',
      fontSize: 11,
      color: colors.lightDark,
      textAlign: 'center',
    },
    renderHealthView: {
      height: 120,
      width: 110,
      backgroundColor: colors.white,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 10,
      marginHorizontal: 5,
    },
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
    circleView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    date: {
      fontSize: 12,
      fontFamily: fonts.light,
      marginBottom: 10,
      color: colors.heading,
    },
    circleText: {
      marginTop: 10,
      fontFamily: fonts.regular,
      color: colors.heading,
      fontWeight: 'bold',
    },
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
    highlightsView: {
      height: 85,
      width: 187,

      borderRadius: 5,
      //   padding: 5,
      overflow: 'hidden',
    },
    highlightstext: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.white,
    },
    blurView: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#3D3D3D90',
      paddingHorizontal: 10,
    },
  });
export default styles;
