import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';

const styles = (colors: any) =>
  StyleSheet.create({
    demoContainer: {
      // flex: 1,
      backgroundColor: colors.opacityBlackDark,
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 30,
    },
    containerBody: {
      flex: 1,
      position: 'relative',
      paddingHorizontal: 15,
      paddingTop: 20,
      zIndex: 30,
    },
    demobottomView: {
      position: 'absolute',
      width: '100%',
      height: '23%',
      justifyContent: 'space-between',
      bottom: 0,
      marginBottom: 20,
    },
    demoTextView: {
      width: '100%',
      height: '50%',
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      // marginBottom: 20,
    },
    demoText: {
      fontFamily: fonts.extraBold,
      color: colors.heading,
      fontSize: 22,
    },
    demoButtonView: {
      width: '100%',
      paddingHorizontal: 15,
    },
    headingText: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.heading,
    },

    recordKeepingView: {
      marginHorizontal: 5,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 25,
      borderRadius: 8,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      // zIndex: 100,
    },
    recordKeepinText: {
      fontSize: 20,
      paddingLeft: 10,
      color: colors.lightBlueish,
      fontFamily: fonts.mulishExtraBold,
    },
    bottomTextView: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 40,
    },
    bottomText: {
      fontFamily: fonts.mulishRegular,
      fontSize: 15,
    },
    messengerView: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      marginRight: 20,
      marginBottom: 20,
    },
  });
export default styles;
