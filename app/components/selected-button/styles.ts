import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    view: {
      width: widthToDp(30),
      height: heightToDp(7),
      backgroundColor: colors.darkPrimary,
    },
  });
export default makeStyles;
