import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      width: '100%',
      flex: 1,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
      paddingHorizontal: 10,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    containerNC: {
      paddingVertical: 20,
    },
    containerC: {
      height: 170,
    },
    heading: {
      fontFamily: fonts.bold,
      fontSize: 20,
      color: colors.heading,
      marginTop: 15,
    },
    view: {
      borderTopWidth: 2,
      borderTopColor: '#DAE0EB',
      width: '100%',
      height: 100,
      paddingTop: 10,
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    details: {
      flexDirection: 'column',
      width: '50%',
    },
  });

export default makeStyles;
