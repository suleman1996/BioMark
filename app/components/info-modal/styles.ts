import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

const styles = (colors: any) =>
  StyleSheet.create({
    // modal
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      paddingHorizontal: widthToDp(2),
      marginHorizontal: widthToDp(2),
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      alignItems: 'center',
    },
    modalText2: {
      marginTop: heightToDp(1),
      marginHorizontal: 10,
      fontFamily: fonts.OpenSansRegular,
      fontSize: responsiveFontSize(16),
      textAlign: 'center',
    },
    modalText: {
      fontSize: responsiveFontSize(20),
      color: colors.heading,
      fontFamily: fonts.mulishBold,
    },
    gradientButton: {
      marginTop: heightToDp(2),
      marginBottom: heightToDp(2),
      width: widthToDp(35),
      alignItems: 'center',
    },
    cancel: {
      textAlign: 'center',
      marginTop: heightToDp(3),
      marginBottom: heightToDp(2),
    },
    cancelText: {
      textAlign: 'center',
      fontFamily: fonts.OpenSansBold,
      color: colors.grey,
    },
    modalView2: {
      marginHorizontal: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    },
    btnView: {
      height: 50,
      width: 100,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    btnText: {
      // fontWeight: 'bold',
      fontFamily: fonts.mulishRegular,
      color: colors.white,
      fontSize: responsiveFontSize(18),
      textAlign: 'center',
    },
  });
export default styles;
