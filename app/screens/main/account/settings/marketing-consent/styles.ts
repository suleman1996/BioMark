import { StyleSheet } from 'react-native'
import { heightToDp, widthToDp } from '../../../../../utils/functions/responsiveDimentions'
import { responsiveFontSize } from '../../../../../utils/functions/responsiveText'
import { GlobalFonts } from '../../../../../utils/theme/fonts'
import { GlobalColors } from '../../../../../utils/theme/globalColors'


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(2),
    height: '100%',
  },
  headerText: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.light,
    color: GlobalColors.darkPrimary,
  },
  checkbox: {
    transform: [{scaleX: 1.8}, {scaleY: 1.8}],
  },
  bottomBtnContainer: {
            position: 'absolute',
            bottom: 20, 
            width: widthToDp(100),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: widthToDp(4)
  },
});