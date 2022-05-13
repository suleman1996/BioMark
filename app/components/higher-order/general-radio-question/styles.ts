import { StyleSheet } from 'react-native';

import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: widthToDp(4),
  },
  qText: {
    fontSize: responsiveFontSize(20),
    fontFamily: GlobalFonts.extraBold,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
  },
  singleRadioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: widthToDp(3),
  },
  radioLabel: {
    fontSize: responsiveFontSize(20),
    fontFamily: GlobalFonts.regular,
  },
});
