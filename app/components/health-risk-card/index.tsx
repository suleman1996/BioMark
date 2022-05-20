import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {
  H1Text?: string;
  number?: any;
  H2Text?: string;
  description?: string;
  icon?: string;
  image?: any;
};

const HealthCard = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.view}>
      <View style={styles.view3}>
        <View style={styles.view2}>
          <Image source={props.image} style={styles.green} />
          <Text style={styles.diabetes}>{props.H1Text}</Text>
        </View>
        <Text style={styles.text}>{props.H2Text}</Text>
      </View>

      <Text style={styles.text2}>{props.number}</Text>
      <Text style={styles.text3}>{props.description}</Text>
    </View>
  );
};
export default HealthCard;
