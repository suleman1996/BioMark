import { StyleSheet } from 'react-native';

export const makeStyles = () =>
  StyleSheet.create({
    options: {
      width: '100%',
      overflow: 'scroll',
      flexDirection: 'row',
      alignItems: 'center',
    },
    imgContentContainer: {
      flexDirection: 'row',
      marginRight: 12,
      borderRadius: 20,
    },
    imgContent: {
      alignSelf: 'center',
      paddingRight: 5,
      color: 'white',
      fontSize: 15,
      fontFamily: 'mulish',
      fontWeight: '400',
    },
    toggleContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      borderRadius: 3,
      borderColor: 'lightgrey',
      borderWidth: 1,
    },
    graphContainer: {
      marginTop: 20,
      width: '100%',
      height: 300,
    },
    barDataPoint: {
      color: '#8493AE',
      fontSize: 8,
      marginBottom: 6,
    },
    btnContent: {
      height: 40,
      backgroundColor: 'white',
      minWidth: '49%',
    },
    btnSelected: {
      backgroundColor: '#1B96D8',
      color: '#1B96D8',
    },
  });
export default makeStyles;
