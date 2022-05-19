import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      height: 50,
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: colors.white,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    ripple: {
      height: 40,
      width: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginLeft: 5,
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.black,
    },
  });
export default makeStyles;
