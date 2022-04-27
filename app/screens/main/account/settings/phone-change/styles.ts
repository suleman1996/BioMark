import { StyleSheet } from 'react-native';

import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthToDp(6),
    paddingVertical: widthToDp(1),
    backgroundColor: GlobalColors.white,
  },
  phoneText: {
    fontSize: responsiveFontSize(23),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
});
