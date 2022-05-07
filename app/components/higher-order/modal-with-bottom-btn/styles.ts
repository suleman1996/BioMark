import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const styles = StyleSheet.create({
  card: {
    width: widthToDp(90),
    height: heightToDp(85),
    backgroundColor: GlobalColors.white,
    borderRadius: widthToDp(3),
  },
  title: {
    fontSize: responsiveFontSize(25),
    color: GlobalColors.darkPrimary,
    fontFamily: GlobalFonts.bold,
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(2),
    marginBottom: heightToDp(3),
  },
});
