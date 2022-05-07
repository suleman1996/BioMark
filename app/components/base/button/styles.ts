import { StyleSheet } from 'react-native';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.primary,
    height: heightToDp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthToDp(2.5),
    width: '100%',
    maxWidth: widthToDp(86),
  },
  text: {
    color: GlobalColors.white,
    fontFamily: GlobalFonts.medium,
    fontSize: responsiveFontSize(18),
  },
});
