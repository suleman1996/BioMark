import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import makeStyles from './styles';

type Props = {
  text?: string;
  onPress?: any;
  disabled?: any;
  color?: any;
  style?: any;
};
const GradientButton = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.disabled}
        style={props.style}
      >
        <LinearGradient
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1, y: 0.25 }}
          colors={props.color}
          style={{
            height: 50,
            // marginHorizontal: 30,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.text}>{props.text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};
export default GradientButton;
