import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalStyles } from 'utils/theme/global-styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  header: {
    width: widthToDp(100),
    backgroundColor: GlobalColors.white,
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(2.5),
    paddingBottom: heightToDp(2),
    ...GlobalStyles.shadow,
    borderBottomWidth: heightToDp(0.5),
    borderBottomColor: GlobalColors.gray,
  },
  titleContainer: {
    paddingVertical: heightToDp(1),
  },
  textStyle: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    marginTop: heightToDp(2),
    color: GlobalColors.darkPrimary,
  },
});
