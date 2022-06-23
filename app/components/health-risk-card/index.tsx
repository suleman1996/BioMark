import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {
  H1Text?: string;
  number?: any;
  H2Text?: string;
  description?: string;
  icon?: string;
  image?: any;
  H2TextStyle?: any;
  numberStyle?: any;
  svg?: any;
};

const HealthCard = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.view}>
      <View style={styles.view3}>
        <View style={styles.view2}>
          {props?.svg}
          <Text style={styles.diabetes}>{props?.H1Text}</Text>
        </View>
        <Text style={props?.H2TextStyle}>{props?.H2Text}</Text>
      </View>

      <Text style={props?.numberStyle}>{props?.number}</Text>
      <Text style={styles.text3}>{props?.description}</Text>
    </View>
  );
};
export default HealthCard;
