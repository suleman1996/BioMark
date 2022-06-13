import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    infoView: {
      flexDirection: 'row',
      marginTop: heightToDp(5),
      marginHorizontal: widthToDp(10),
    },
    text: {
      color: colors.heading,
      marginHorizontal: widthToDp(3),
      fontSize: responsiveFontSize(17),
      fontFamily: fonts.mulishRegular,
    },
    uploadView: {
      flexDirection: 'row',
      marginHorizontal: widthToDp(10),
      marginTop: heightToDp(5),
    },
    uploadText: {
      color: colors.heading,
      marginHorizontal: widthToDp(3),
      fontSize: responsiveFontSize(18),
      fontFamily: fonts.OpenSansBold,
    },
    numberText: {
      color: colors.heading,
      fontSize: responsiveFontSize(18),
      fontFamily: fonts.OpenSansBold,
    },
    imageView: {
      height: heightToDp(22),
      width: widthToDp(40),
      backgroundColor: colors.fieldGrey,
      marginHorizontal: widthToDp(10),
      marginTop: heightToDp(2),
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageView2: {
      height: heightToDp(22),
      width: widthToDp(38),
      backgroundColor: colors.fieldGrey,
      marginLeft: widthToDp(10),

      marginTop: heightToDp(2),
      borderRadius: 8,
      alignItems: 'flex-end',
    },
    addPage: {
      color: colors.heading,
      fontFamily: fonts.mulishRegular,
    },
    deleteIcon: {
      marginTop: heightToDp(2),
      marginHorizontal: widthToDp(2),
    },
    document: {
      color: colors.primary,
      marginHorizontal: widthToDp(3),
      fontSize: responsiveFontSize(22),
      fontFamily: fonts.mulishBold,
    },
    textinputView: {
      marginHorizontal: widthToDp(10),
      // marginTop: heightToDp(5),
      marginTop: 10,
      borderColor: colors.heading,
    },
    note: {
      marginHorizontal: widthToDp(10),
      backgroundColor: '#E5F7F3',
      borderWidth: 1,
      borderColor: colors.normal,
      borderRadius: 5,
      marginTop: heightToDp(6),
      paddingHorizontal: widthToDp(5),
      paddingTop: heightToDp(2),
      paddingBottom: heightToDp(2),
    },
    noteText: {
      flex: 1,
      marginHorizontal: 8,
      color: colors.heading,
    },
    noteText2: {
      marginHorizontal: 8,
      flex: 1,
      paddingTop: heightToDp(3),
      paddingBottom: 10,
      color: colors.heading,
    },
    noteView: {
      paddingTop: 10,
      justifyContent: 'space-between',
    },
  });
export default makeStyles;
