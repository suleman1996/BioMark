import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';

const styles = (colors: any) =>
  StyleSheet.create({
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
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.heading,
    },
    videoView: {
      marginBottom: 20,
      borderWidth: 1,
      borderRadius: 5,
    },
    backgroundVideo: {
      height: 200,
      borderRadius: 5,
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
  });
export default styles;
