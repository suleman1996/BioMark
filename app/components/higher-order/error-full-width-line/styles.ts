import { StyleSheet } from 'react-native';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  container: {
    width: widthToDp(100),
    backgroundColor: GlobalColors.red,
    padding: widthToDp(1.5),
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
  },
  text: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.white,
    paddingLeft: widthToDp(4),
  },
});
