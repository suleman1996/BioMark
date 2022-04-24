import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(2),
    height: '100%',
  },
  headerText: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.light,
    color: GlobalColors.darkPrimary,
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
