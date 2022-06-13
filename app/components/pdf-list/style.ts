import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp } from 'utils/functions/responsive-dimensions';

const styles = (colors: any) =>
  StyleSheet.create({
    listView: {
      backgroundColor: colors.white,
      marginTop: heightToDp(2),
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      justifyContent: 'space-between',
      elevation: 5,
      marginBottom: heightToDp(1),
      marginHorizontal: 15,
    },
    listTitle: {
      flex: 1,
      fontSize: responsiveFontSize(20),
      color: colors.lightBlueish,
      fontFamily: fonts.mulishExtraBold,
    },
  });
export default styles;
