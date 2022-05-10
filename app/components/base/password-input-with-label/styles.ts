import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp } from 'utils/functions/responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(2),
  },
  label: {
    fontSize: responsiveFontSize(25),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
  inputLabel: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
});
