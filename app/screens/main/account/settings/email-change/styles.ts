import { StyleSheet } from 'react-native';
import { widthToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: widthToDp(4),
      backgroundColor: colors.white,
    },
  });
export default makeStyles;
