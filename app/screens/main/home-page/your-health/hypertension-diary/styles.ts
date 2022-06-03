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
