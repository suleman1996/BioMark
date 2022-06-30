import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      flex: 1,
      marginTop: heightToDp(2),
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      marginLeft: 5,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: widthToDp(24.5),
      marginRight: widthToDp(3),
      marginVertical: 3,
      borderRadius: widthToDp(2),
      height: heightToDp(5.5),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 3,
    },
    label: {
      fontSize: responsiveFontSize(18),
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.medium,
    },
  });
export default makeStyles;
