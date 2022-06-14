import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    healthRisk: {
      // height: 100,
      backgroundColor: colors.white,
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      paddingBottom: 10,
    },

    healthName: {
      fontFamily: fonts.regular,
      fontWeight: 'bold',
      color: colors.black,
      fontSize: 14,
      marginLeft: 10,
    },
    healthCardStatusName: {
      fontFamily: fonts.regular,
      fontWeight: 'bold',

      fontSize: 12,
    },
    descriptionHealthRisk: {
      fontFamily: fonts.light,
      marginTop: 10,
    },
  });
export default makeStyles;
