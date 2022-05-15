import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: heightToDp(5),
    justifyContent: 'center',
    paddingBottom: heightToDp(10),
    backgroundColor: GlobalColors.white,
  },
  image: {
    width: widthToDp(25),
    height: widthToDp(25),
    borderRadius: widthToDp(12.5),
  },
  profile: {
    paddingHorizontal: widthToDp(4),
  },
  name: {
    fontFamily: GlobalFonts.medium,
    fontSize: responsiveFontSize(22),
    color: GlobalColors.darkPrimary,
    paddingRight: widthToDp(20),
  },
  editProfile: {
    fontFamily: fonts.mulishLight,
    fontSize: responsiveFontSize(20),
    color: GlobalColors.primary,
    paddingLeft: widthToDp(2),
  },
  menuList: {
    paddingTop: widthToDp(7),
    marginBottom: heightToDp(7),
  },
  accountScreenView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthToDp(100),
    paddingHorizontal: widthToDp(6),
  },
});
