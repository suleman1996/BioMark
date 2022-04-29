import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: widthToDp(100),
    justifyContent: 'space-between',
    paddingHorizontal: widthToDp(4),
    paddingVertical: heightToDp(2),
    alignItems: 'center',
    borderTopWidth: 0.3,
  },
  menuItemText: {
    fontFamily: GlobalFonts.semiBold,
    fontSize: responsiveFontSize(22),
    color: GlobalColors.darkPrimary,
  },
});
