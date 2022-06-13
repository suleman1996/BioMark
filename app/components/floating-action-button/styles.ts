import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
    },
  });

export default makeStyles;
