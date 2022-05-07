import { StyleSheet } from 'react-native';

import { widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const styles = StyleSheet.create({
  container: {
    width: widthToDp(92),
    flexDirection: 'row',
    alignItems: 'center',
    padding: widthToDp(2),
    borderWidth: 1,
    paddingLeft: widthToDp(4),
    justifyContent: 'space-between',
  },
  text: {
    color: GlobalColors.darkPrimary,
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(20),
    paddingLeft: widthToDp(3),
  },
});