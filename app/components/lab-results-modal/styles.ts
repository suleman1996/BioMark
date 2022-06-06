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
      borderRadius: 5,
      shadowColor: '#000',
      paddingHorizontal: widthToDp(5),
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '90%',
      paddingBottom: heightToDp(5),
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
      marginBottom: heightToDp(4),
    },
    cancelText: {
      textAlign: 'center',
      fontFamily: fonts.OpenSansBold,
      color: colors.grey,
    },
    modalView2: {
      paddingBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      alignItems: 'center',
    },
    buttonView: {
      paddingTop: heightToDp(1),
    },
  });
export default styles;
