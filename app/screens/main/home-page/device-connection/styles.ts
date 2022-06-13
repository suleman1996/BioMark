import { StyleSheet } from 'react-native';

export const makeStyles = (_colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    webview: {
      height: 300,
    },
  });

export default makeStyles;
