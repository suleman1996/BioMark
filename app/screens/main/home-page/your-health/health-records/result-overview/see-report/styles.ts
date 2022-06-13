import { StyleSheet, Dimensions } from 'react-native';
import fonts from 'assets/fonts';
// import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    miniHeader: {
      height: '4%',
      backgroundColor: colors.blue,
      paddingHorizontal: 15,
    },
    miniHeaderText: {
      color: colors.white,
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    pdfView: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  });
export default styles;
