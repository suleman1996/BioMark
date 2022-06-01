import { StyleSheet } from 'react-native';

const styles = (colors: any) =>
  StyleSheet.create({
    listView: {
      backgroundColor: colors.black,
      flex: 1,
    },
    backgroundVideo: {
      flex: 1,
      resizeMode: 'contain',
    },
  });
export default styles;
