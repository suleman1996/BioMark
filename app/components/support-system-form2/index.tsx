import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {
  text?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  text5?: string;
};
const SupportSystemForm2 = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <>
      <View style={styles.flatlistView}>
        <Text style={styles.flatlistText}>{props.text}</Text>
      </View>

      <View style={styles.flatlistView}>
        <Text style={styles.flatlistText}>{props.text2}</Text>
      </View>

      <View style={styles.flatlistView}>
        <Text style={styles.flatlistText}>{props.text3}</Text>
      </View>

      <View style={styles.flatlistView}>
        <Text style={styles.flatlistText}>{props.text4}</Text>
      </View>

      <View style={styles.flatlistView}>
        <Text style={styles.flatlistText}>{props.text5}</Text>
      </View>
    </>
  );
};
export default SupportSystemForm2;
