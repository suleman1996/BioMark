import { StyleSheet } from 'react-native';
import colors from '../../../../../../assets/colors';
import { responsiveFontSize } from '../../../../../../utils/functions/responsive-text';
import { GlobalFonts } from '../../../../../../utils/theme/fonts';
import {
  heightToDp,
  widthToDp,
} from '../../../../../../utils/functions/responsive-dimensions';
import fonts from '../../../../../../assets/fonts';
import { GlobalColors } from '../../../../../../utils/theme/global-colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.light,
    fontSize: 18,
  },
  label: {
    fontSize: responsiveFontSize(19),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
    marginHorizontal: heightToDp(5),
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: heightToDp(5),
    marginVertical: 8,
    borderRadius: 3,
  },
  radioText: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.light,
  },
  textinputView: {
    marginHorizontal: heightToDp(5),
    marginTop: 10,
    borderBottomWidth: 0,
    borderColor: GlobalColors.darkPrimary,
  },
  container2: {
    marginHorizontal: heightToDp(5),
    // marginTop:10,
    borderBottomWidth: 0,
    borderColor: GlobalColors.darkPrimary,
    backgroundColor: '#EBEFF2',
    height: 50,
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,
  },
});
