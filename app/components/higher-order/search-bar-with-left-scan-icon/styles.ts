import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    searchBar: {
      width: widthToDp(92),
      backgroundColor: colors.white,
      height: heightToDp(6),
      borderRadius: widthToDp(2),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    leftIconView: {
      width: widthToDp(12),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primaryGray,
      borderTopLeftRadius: widthToDp(2),
      borderBottomLeftRadius: widthToDp(2),
    },
    input: {
      width: widthToDp(70),
      fontSize: responsiveFontSize(20),
      color: '#3D3D3D',
      marginHorizontal: 10,
      fontFamily: fonts.mulishRegular,
    },
    inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingLeft: widthToDp(2),
    },
    popupMenu: {
      borderRadius: 8,
      flex: 1,
      width: widthToDp(65),
      // height:heightToDp(15),
      marginTop: 40,
      marginLeft: -15,
    },
    singleMenuItem: {
      paddingHorizontal: widthToDp(4),
      paddingVertical: widthToDp(2.5),
      borderBottomWidth: 0.5,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      borderBottomColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuText: {
      paddingLeft: widthToDp(3),
      fontFamily: fonts.mulishRegular,
      color: '#8493AE',
      fontSize: 15,
    },
    popUpBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    popUpContainer: {
      width: '80%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 9,
    },
    popUpHeader: {
      width: '100%',
      height: 40,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    popUpHeading: {
      fontFamily: fonts.bold,
      fontSize: 21,
      color: colors.heading,
    },
    popUpSubHeading: {
      fontFamily: fonts.extraBold,
      fontSize: 15,
      color: colors.heading,
    },
    textInput: {
      borderRadius: 8,
      padding: 10,
    },
    errorMessage: {
      marginHorizontal: 5,
      fontSize: 12,
      color: colors.danger,
    },
  });
export default makeStyles;
