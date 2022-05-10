import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { StyleSheet } from 'react-native';

import colors from 'assets/colors';
import fonts from 'assets/fonts';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const styles = StyleSheet.create({
  container: {
    // flex: 0,
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: heightToDp(10),
  },
  text: {
    fontFamily: fonts.light,
    fontSize: 18,
  },
  pagerView: {
    width: widthToDp(92),
    height: heightToDp(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightToDp(1.5),
    marginBottom: heightToDp(10),
  },
  tabNameContainer: {
    width: widthToDp(92),
    flexDirection: 'row',
    paddingTop: heightToDp(2),
  },
  tab: {
    marginRight: widthToDp(3),
    paddingHorizontal: widthToDp(4),
    alignItems: 'center',
    borderColor: GlobalColors.darkPrimary,
  },
  tabText: {
    fontFamily: GlobalFonts.bold,
    color: GlobalColors.darkPrimary,
    fontSize: responsiveFontSize(22),
  },
  previousNotificationContainer: {
    width: widthToDp(92),
    height: heightToDp(100),
    borderWidth: 1.2,
    borderColor: GlobalColors.gray,
    borderRadius: widthToDp(4),
    flex: 1,
    alignItems: 'center',
  },
  blackLine: {
    width: widthToDp(86),
    height: heightToDp(0.15),
    backgroundColor: GlobalColors.black,
    marginTop: heightToDp(2),
    marginBottom: heightToDp(2),
  },
  prevHeaderText: {
    color: GlobalColors.darkPrimary,
    fontFamily: GlobalFonts.bold,
    fontSize: responsiveFontSize(23),
  },
  headerContainer: {
    width: widthToDp(86),
  },
});
