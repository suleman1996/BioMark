import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthToDp(7),
    paddingTop: heightToDp(2),
    backgroundColor: GlobalColors.white,
  },
  headerText: {
    fontSize: responsiveFontSize(23),
    fontFamily: GlobalFonts.extraLight,
    color: GlobalColors.darkPrimary,
    letterSpacing: -0.1,
    lineHeight: heightToDp(3.5),
  },
  checkbox: {
    transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],
  },
  bottomBtnContainer: {
    position: 'absolute',
    bottom: 20,
    width: widthToDp(100),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthToDp(4),
  },
});
