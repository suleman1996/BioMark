import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      height: 60,
      width: '100%',
      backgroundColor: colors.white,
      padding: 5,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      flexDirection: 'row',
    },
    filterView: {
      width: '15%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchView: {
      width: '85%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      //   backgroundColor: 'red',
    },
    input: {
      height: 40,
      //   margin: 12,
      padding: 10,
      backgroundColor: colors.inputBg,
      flex: 1,
    },
    inputView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBg,
      borderRadius: 5,
      overflow: 'hidden',
      marginLeft: 5,
    },
    placeHolder: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.bg,
    },
  });
export default makeStyles;
