import { StyleSheet } from 'react-native'
import fonts from '../../../../assets/fonts/fonts'
import { heightToDp, widthToDp } from '../../../../utils/functions/responsiveDimentions'
import { responsiveFontSize } from '../../../../utils/functions/responsiveText'
import { GlobalFonts } from '../../../../utils/theme/fonts'
import { GlobalColors } from '../../../../utils/theme/globalColors'

export const styles = StyleSheet.create({
          menuItem: {
                    flexDirection: 'row',
                    width: '100%',
                    maxWidth: widthToDp(100),
                    justifyContent: 'space-between',
                    paddingHorizontal: widthToDp(4),
                    paddingVertical: heightToDp(2.5),
                    alignItems: 'center',
                    borderTopWidth: 0.5,
          },
          menuItemText: {
                    fontFamily: GlobalFonts.bold,
                    fontSize: responsiveFontSize(22),
                    color: GlobalColors.darkPrimary,
          }
})