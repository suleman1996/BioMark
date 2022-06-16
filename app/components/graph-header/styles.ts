import { StyleSheet } from 'react-native';

const styles = (colors: any) =>
  StyleSheet.create({
    header: {
      height: 25,
      backgroundColor: colors.lightBlue,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 2,
      justifyContent: 'space-between',
      marginTop: 5,
    },
    selected: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 18,
      height: 29,
      borderRadius: 2,
    },
    unselected: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 18,
    },
  });
export default styles;
