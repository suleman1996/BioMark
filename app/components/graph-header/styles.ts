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
      paddingHorizontal: 3,
      justifyContent: 'space-around',
      marginTop: 5,
    },
    selected: {
      //   backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
      height: 29,
      borderRadius: 2,
    },
  });
export default styles;
