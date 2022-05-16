import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalStyles } from 'utils/theme/global-styles';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      position: 'absolute',
      // borderWidth: 2,
      backgroundColor: colors.white,
      bottom: 0,
      paddingHorizontal: widthToDp(6),
      paddingVertical: heightToDp(3),
      ...GlobalStyles(colors).shadow,
    },
  });

export default makeStyles;
