import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    dataPoint: {
      color: colors.inActive,
      fontSize: 12,
      marginBottom: 6,
    },
  });

export default makeStyles;
