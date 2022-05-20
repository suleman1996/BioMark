import React from 'react';
import { FlatList, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {
  title?: string;
  text?: string;
  image?: any;
  data?: any;
  renderItem?: any;
  Refrences?: string;
  RefText?: string;
  FootNotes?: string;
  NotesText?: string;
  Calculation?: string;
  CalcText?: string;
};
const HealthListCard = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <Text style={styles.text4}>{props?.Calculation}</Text>
      <Text style={styles.text5}>{props?.CalcText}</Text>
      <FlatList
        data={props?.data}
        renderItem={props?.renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.text6}>{props?.Refrences}</Text>
      <Text style={styles.text7}>{props?.RefText}</Text>
      <Text style={styles.text6}>{props?.FootNotes}</Text>
      <Text style={styles.text7}>{props?.NotesText}</Text>
    </>
  );
};
export default HealthListCard;
