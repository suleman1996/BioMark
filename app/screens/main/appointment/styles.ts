import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: fonts.light,
      fontSize: 18,
    },
  });
export default makeStyles;
