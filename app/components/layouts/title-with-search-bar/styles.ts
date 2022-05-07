import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  container: {
    width: widthToDp(100),
  },
  titleBar: {
    backgroundColor: GlobalColors.primary,
    paddingVertical: heightToDp(1.1),
    paddingHorizontal: widthToDp(4),
  },
  textStyle: {
    color: GlobalColors.white,
    fontSize: responsiveFontSize(30),
    fontFamily: GlobalFonts.bold,
  },
  searchBarContainer: {
    alignItems: 'center',
    backgroundColor: GlobalColors.white,
    paddingBottom: heightToDp(0.5),
  },
  halfPrimary: {
    height: heightToDp(3),
    width: '100%',
    backgroundColor: GlobalColors.primary,
    position: 'absolute',
    top: 0,
  },
});
