import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

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
      fontSize: 17,
    },
    demoButtonView: {
      width: '100%',
      paddingHorizontal: 15,
    },
    container: {
      flex: 1,
    },
    containerBody: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 20,
      //   alignItems: 'center',
    },
    headingText: {
      //   fontFamily: fonts.bold,
      fontSize: 18,
      paddingHorizontal: 20,
      color: colors.heading,
    },
    recordKeepingView: {
      marginHorizontal: 5,
      flexDirection: 'row',
      alignItems: 'center',
      //   justifyContent: 'space-between',
      padding: 25,
      borderRadius: 8,
      marginBottom: 15,
      //   paddingHorizontal: 18,
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
      fontSize: 20,
      //   borderWidth: 2,
      paddingLeft: 10,
      color: colors.primary,
      fontFamily: fonts.mulishExtraBold,
    },
    bottomTextView: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 40,
    },
    bottomText: {
      fontFamily: fonts.mulishRegular,
      fontSize: 17,
    },
    messengerView: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      marginRight: 20,
      marginBottom: 20,
    },
    backgroundVideo: {
      height: 200,
      borderRadius: 5,
      margin: 5,
      justifyContent: 'center',
    },

    // modal
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    videoView: {
      marginHorizontal: 15,
      marginBottom: 5,
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      paddingHorizontal: widthToDp(5),
      marginHorizontal: widthToDp(5),
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText2: {
      marginTop: heightToDp(5),
      marginHorizontal: 10,
      fontFamily: fonts.OpenSansRegular,
    },
    modalText: {
      fontSize: responsiveFontSize(20),
      color: colors.heading,
      fontFamily: fonts.mulishBold,
    },
    gradientButton: {
      marginTop: heightToDp(7),
    },
    cancel: {
      textAlign: 'center',
      marginTop: heightToDp(3),
      marginBottom: heightToDp(4),
    },
    cancelText: {
      textAlign: 'center',
      fontFamily: fonts.OpenSansBold,
      color: colors.grey,
    },
    modalView2: {
      marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
  });
export default styles;
