import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.dangerRed,
      marginTop: 5,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
    },
    errorMessage: {
      marginHorizontal: 0,
      color: 'white',
      flex: 1,
    },
  });
export default makeStyles;
