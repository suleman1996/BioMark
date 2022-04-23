import { StyleSheet } from 'react-native';
import {
  heightToDp,
  widthToDp,
} from '../../../../../utils/functions/responsive-dimensions';
import { GlobalFonts } from '../../../../../utils/theme/fonts';
import { GlobalColors } from '../../../../../utils/theme/global-colors';
import { responsiveFontSize } from '../../../../../utils/functions/responsive-text';
const styles = StyleSheet.create({
  bottomView: {
    borderWidth: 2,
    width: widthToDp(90),
  },
  container: {
    alignItems: 'center',
    paddingBottom: heightToDp(7),
  },
  topBg: {
    width: widthToDp(100),
    height: heightToDp(7),
    position: 'absolute',
    top: 0,
    backgroundColor: GlobalColors.primary,
  },
  image: {
    width: widthToDp(25),
    height: widthToDp(25),
    borderRadius: widthToDp(12.5),
  },
  contentContainer: {
    width: widthToDp(92),
    backgroundColor: GlobalColors.white,
    flex: 1,
    marginTop: heightToDp(4),
    borderRadius: widthToDp(3),
    alignItems: 'center',
  },
  profileContainer: {
    width: widthToDp(25),
    height: widthToDp(25),
    borderRadius: widthToDp(12.5),
    position: 'absolute',
    top: -heightToDp(3),
    backgroundColor: GlobalColors.white,
  },
  name: {
    marginTop: heightToDp(8),
    fontSize: responsiveFontSize(17),
    fontFamily: GlobalFonts.semiBold,
    color: GlobalColors.darkPrimary,
  },
  menuContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: widthToDp(3),
    marginTop: heightToDp(2),
    marginBottom: heightToDp(3),
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightToDp(1),
  },
  menuTitleAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitleText: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.light,
    marginLeft: widthToDp(4),
  },
});

export default styles;
