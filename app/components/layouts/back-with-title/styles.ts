import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalFonts } from 'utils/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: widthToDp(100),
    backgroundColor: GlobalColors.primary,
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(2.5),
    paddingBottom: heightToDp(2),
    borderBottomWidth: 0.3,
  },
  titleContainer: {
    paddingVertical: heightToDp(1),
  },
  textStyle: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    marginTop: heightToDp(2),
    color: GlobalColors.white,
  },
});
