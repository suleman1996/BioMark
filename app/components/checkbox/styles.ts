import { StyleSheet } from 'react-native';

export const makeStyles = () =>
  StyleSheet.create({
    checkbox: {
      width: 25,
      height: 25,
      marginRight: 5,
      borderRadius: 5,
      borderWidth: 1.5,

      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default makeStyles;
