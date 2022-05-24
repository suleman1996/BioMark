import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { GlobalFonts } from 'utils/theme/fonts';
// import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    text: {
      fontWeight: 'bold',
      color: colors.white,
      fontSize: responsiveFontSize(15),
    },
  });
export default makeStyles;
