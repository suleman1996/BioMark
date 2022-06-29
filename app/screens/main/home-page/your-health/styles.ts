import { Dimensions, StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.container,
    },
    navBar: {
      backgroundColor: colors.blue,
      height: 85,
      width: '100%',
    },
    navHeading: {
      fontFamily: fonts.bold,
      fontSize: RFValue(20),
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
    containerBody: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: heightToDp(15),
      position: 'absolute',
      zIndex: -3,
      height: Dimensions.get('window').height,
    },
    headingText: {
      fontFamily: fonts.semiBold,
      fontSize: RFValue(19),
      color: colors.heading,
    },
    healthRiskView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 5,
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

    healthRisk: {
      // height: 100,
      backgroundColor: colors.white,
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      paddingBottom: 10,
    },
    healthName: {
      fontFamily: fonts.regular,
      fontWeight: 'bold',
      color: colors.black,
      fontSize: 14,
      marginLeft: 10,
    },
    healthCardStatusName: {
      fontFamily: fonts.regular,
      fontWeight: 'bold',
      color: colors.lightGrey,
      fontSize: 12,
    },
    descriptionHealthRisk: {
      fontFamily: fonts.light,
      marginTop: 10,
    },
    textInput: {
      borderRadius: 8,
      padding: 10,
    },
    popUpHeader: {
      width: '100%',
      height: 40,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    popUpHeading: {
      fontFamily: fonts.bold,
      fontSize: 21,
      color: colors.heading,
    },
    popUpSubHeading: {
      fontFamily: fonts.extraBold,
      fontSize: 15,
      color: colors.heading,
    },
    singleMenuItem: {
      paddingHorizontal: widthToDp(4),
      paddingVertical: widthToDp(2.5),
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      borderBottomColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
    },

    errorMessage: {
      marginHorizontal: 5,
      fontSize: 12,
      color: colors.danger,
    },
  });
export default styles;
