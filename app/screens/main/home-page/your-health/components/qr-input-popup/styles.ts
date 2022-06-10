import { StyleSheet } from 'react-native';

export const makeStyles = () =>
  StyleSheet.create({
    popUpBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    popUpContainer: {
      width: '80%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 9,
    },
  });
export default makeStyles;
