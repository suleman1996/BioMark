import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { heightToDp } from 'utils/functions/responsive-dimensions';

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
    videoView: {
      marginHorizontal: 15,
      marginBottom: 5,
    },
    backgroundVideo: {
      height: 200,
      margin: 5,
      justifyContent: 'center',
      borderRadius: 5,
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
      fontSize: 17,
    },
    demoButtonView: {
      width: '100%',
      paddingHorizontal: 15,
    },
    headingText: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.heading,
      paddingHorizontal: 20,
    },

    recordKeepingView: {
      backgroundColor: colors.white,
      marginTop: heightToDp(2),
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      justifyContent: 'space-between',
      elevation: 5,
      marginBottom: heightToDp(1),
      marginHorizontal: 15,
    },
    recordKeepinText: {
      fontSize: 17,
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
      zIndex: 20,
      marginRight: 20,
      marginBottom: 20,
    },
  });
export default styles;
