import { StyleSheet } from 'react-native';

import colors from 'assets/colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.inputBg,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: widthToDp(3),
    height: heightToDp(6),
    backgroundColor: colors.inputBg,
    width: '100%',
  },
  textContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: widthToDp(3),
  },
  dateText: {
    fontFamily: GlobalFonts.light,
    color: GlobalColors.black,
    fontSize: responsiveFontSize(18),
    flex: 1,
    textAlign: 'center',
  },
  verticalLine: {
    height: heightToDp(4),
    borderLeftWidth: 1,
    borderLeftColor: GlobalColors.darkGray,
    width: widthToDp(1),
  },
});
