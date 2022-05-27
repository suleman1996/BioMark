import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Styles from './style';
import { useTheme } from 'react-native-paper';
import PdfSvg from 'assets/svgs/pdf';

const PdfList = ({ item, onPress }) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  console.log('item', item.item.title);

  return (
    <TouchableOpacity style={styles.listView} onPress={onPress}>
      <Text style={styles.listTitle}>{item.item.title}</Text>
      <PdfSvg />
    </TouchableOpacity>
  );
};

export default PdfList;
