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
    addPage: {
      color: colors.heading,
      fontFamily: fonts.mulishRegular,
    },
  });
export default makeStyles;
