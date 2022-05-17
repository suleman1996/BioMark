import { StyleSheet } from 'react-native';

// import colors from 'assets/colors';
import fonts from 'assets/fonts';

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingHorizontal: 15,
    },
    icon: {
      alignSelf: 'center',
      paddingTop: 20,
    },
    heading: {
      fontFamily: fonts.bold,
      fontSize: 24,
      alignSelf: 'center',
      color: colors.heading,
      marginTop: 10,
    },
    inputLablel: {
      marginHorizontal: 20,
      fontFamily: fonts.mulishBold,
      color: colors.heading,
      fontSize: 15,
    },
    forgotPassword: {
      fontFamily: fonts.mulishRegular,
      color: colors.blue,
      fontSize: 14,
    },
    orTxt: {
      marginHorizontal: 20,
      fontFamily: fonts.mulishRegular,
      fontSize: 14,
      color: colors.black,
    },
    dash: { height: 0.5, backgroundColor: colors.blue, width: '40%' },
    orView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      alignSelf: 'center',
      marginVertical: 10,
    },
    socialLogins: {
      justifyContent: 'space-around',
      width: '30%',
      alignSelf: 'center',
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
    },
    noAccountTxt: {
      marginTop: 10,
      fontFamily: fonts.mulishRegular,
      fontSize: 16,
      flexDirection: 'row',
    },
    errorMessage: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.danger,
      marginLeft: 30,
    },
  });

export default makeStyles;
