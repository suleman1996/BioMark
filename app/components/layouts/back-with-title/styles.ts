import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      width: widthToDp(100),
      // backgroundColor: colors.primary,
      paddingHorizontal: widthToDp(4),
      paddingTop: heightToDp(2.5),
      paddingBottom: heightToDp(2),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,

      marginBottom: 10,
    },
    titleContainer: {
      paddingVertical: heightToDp(1),
    },
    textStyle: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.medium,
      marginTop: heightToDp(2),
      color: colors.white,
    },
    optionsView: {
      flexDirection: 'row',
      position: 'absolute',
      right: 0,
      alignItems: 'center',
      height: '100%',
    },
  });
export default makeStyles;
