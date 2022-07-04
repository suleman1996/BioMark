import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    navBar: {
      backgroundColor: colors.white,

      height: 50,
      width: '100%',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.24,
      shadowRadius: 4,
      elevation: 2,
      flexDirection: 'row',
      paddingLeft: 20,
      alignItems: 'center',
    },
    navHeading: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: '#054E8B',
      paddingLeft: 21,
      paddingTop: 10,
      paddingBottom: 10,
    },
  });
export default makeStyles;
