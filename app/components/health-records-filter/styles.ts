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
      marginTop: 22,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      paddingHorizontal: widthToDp(5),
      //   marginHorizontal: widthToDp(5),
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '90%',
    },
    modalText2: {
      fontSize: responsiveFontSize(18),
      marginTop: heightToDp(2),
      color: colors.heading,
      fontFamily: fonts.mulishBold,
    },
    modalText: {
      fontSize: responsiveFontSize(20),
      color: colors.heading,
      fontFamily: fonts.mulishBold,
    },
    gradientButton: {
      marginTop: heightToDp(7),
    },
    cancel: {
      textAlign: 'center',
      marginTop: heightToDp(3),
      // marginBottom: heightToDp(4),
    },
    cancelText: {
      textAlign: 'center',
      fontFamily: fonts.OpenSansBold,
      color: colors.grey,
    },
    modalView2: {
      //   marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      alignItems: 'center',
    },
    modaltitle2: {
      fontSize: responsiveFontSize(18),
      color: colors.heading,
      fontFamily: fonts.mulishBold,
      marginTop: heightToDp(3),
    },
    radioview: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: heightToDp(1),
    },
    radiotext: {
      fontFamily: fonts.mulishRegular,
      fontSize: responsiveFontSize(17),
    },
    datepicker: {
      backgroundColor: colors.inputBg,
      width: '100%',
      height: 40,
      marginTop: 10,
      borderRadius: 8,
      justifyContent: 'space-between',
      // alignContent: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center',
    },
    datePickerText: {
      flex: 1,
      paddingHorizontal: widthToDp(5),
    },
    clear: {
      marginHorizontal: widthToDp(25),
    },
    clearText: {
      textAlign: 'center',
      marginTop: heightToDp(2),
      fontSize: responsiveFontSize(16),
      color: colors.heading,
      fontFamily: fonts.mulishBold,
    },
  });
export default styles;
