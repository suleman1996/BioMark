import { StyleSheet } from 'react-native';

export const makeStyles = () =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      marginBottom: 20,
      alignItems: 'center',
    },
    dataPoint: {
      color: '#8493AE',
      fontSize: 12,
      marginBottom: 6,
    },
    yAxisLabel: {
      fontSize: 10,
      color: '#8493AE',
    },
    xAxisLabel: {
      fontSize: 10,
      color: '#8493AE',
      marginLeft: 8,
    },
    content: {
      fontSize: 14,
      fontWeight: '700',
    },
  });

export default makeStyles;
