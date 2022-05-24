import { StyleSheet } from 'react-native';
import { widthToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      width: widthToDp(20),
      height: widthToDp(20),
      borderRadius: widthToDp(10),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default makeStyles;
