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
  text6?: string;
  text7?: string;
  text8?: string;
  text9?: string;
  text10?: string;
  text11?: string;
};
const SupportSystemForm = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      {props.text && (
        <View style={styles.flatlistView}>
          <View style={styles.bullets}></View>
          <Text style={styles.flatlistText}>{props.text}</Text>
        </View>
      )}

      {props.text2 && (
        <View style={styles.flatlistView}>
          <View style={styles.bullets}></View>
          <Text style={styles.flatlistText}>{props.text2}</Text>
        </View>
      )}

      {props.text3 && (
        <View style={styles.flatlistView}>
          <View style={styles.bullets}></View>
          <Text style={styles.flatlistText}>{props.text3}</Text>
        </View>
      )}

      {props.text4 && (
        <View style={styles.flatlistView}>
          <View style={styles.bullets}></View>
          <Text style={styles.flatlistText}>{props.text4}</Text>
        </View>
      )}

      {props.text5 && (
        <View style={styles.flatlistView}>
          <View style={styles.bullets}></View>
          <Text style={styles.flatlistText}>{props.text5}</Text>
        </View>
      )}

      {props.text6 && (
        <View style={styles.flatlistView}>
          <View style={styles.bullets}></View>
          <Text style={styles.flatlistText}>{props.text6}</Text>
        </View>
      )}

      {props.text7 && (
        <View style={styles.flatlistView}>
          <View style={styles.bullets}></View>
          <Text style={styles.flatlistText}>{props.text7}</Text>
        </View>
      )}

      {props.text8 && (
        <View style={styles.flatlistView}>
          <View style={styles.bullets}></View>
          <Text style={styles.flatlistText}>{props.text8}</Text>
        </View>
      )}

      {props.text9 && (
        <View style={styles.flatlistView}>
          <View style={styles.bullets}></View>
          <Text style={styles.flatlistText}>{props.text9}</Text>
        </View>
      )}

      {props.text10 && (
        <View style={styles.flatlistView}>
          <View style={styles.bullets}></View>
          <Text style={styles.flatlistText}>{props.text10}</Text>
        </View>
      )}

      {props.text11 && (
        <View style={styles.flatlistView}>
          <Text style={styles.flatlistText}>{props.text11}</Text>
        </View>
      )}
    </>
  );
};
export default SupportSystemForm;
