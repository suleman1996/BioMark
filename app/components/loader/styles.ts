import { StyleSheet } from 'react-native';

export const makeStyles = () =>
  StyleSheet.create({
    overLay: {
      position: 'absolute',
      backgroundColor: '#ffffff90',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
  });
export default makeStyles;
