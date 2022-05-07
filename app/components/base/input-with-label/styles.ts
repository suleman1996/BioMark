import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(2),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
  errorContainer: {
    width: '100%',
    paddingVertical: heightToDp(0.3),
    paddingHorizontal: widthToDp(4),
    backgroundColor: GlobalColors.red,
    borderBottomLeftRadius: widthToDp(2),
    borderBottomRightRadius: widthToDp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: GlobalColors.white,
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(14),
    paddingLeft: widthToDp(3),
  },
});
