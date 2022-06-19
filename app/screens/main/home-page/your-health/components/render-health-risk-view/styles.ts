import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    renderHealthRisk: {
      height: 32,
      width: 32,
      borderRadius: 16,

      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      backgroundColor: colors.dangerRed,
      height: 10,
      width: 10,
      borderRadius: 7.5,
      //   position: 'absolute',
      right: 13,
      borderWidth: 1,
      borderColor: colors.white,
    },
    notDot: {
      height: 10,
      width: 10,
      borderRadius: 7.5,
      right: 13,
    },
  });
export default makeStyles;
