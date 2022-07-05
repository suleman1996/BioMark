import { View } from 'react-native';
import React from 'react';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import makeStyles from './styles';

const RenderCircle = ({ svg, title, onPress, Image }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.circleBtn}>
        <TouchableRipple
          onPress={onPress}
          style={styles.btn}
          rippleColor={'rgba(0,128,128,0.05)'}
        >
          {svg ? svg : Image}
        </TouchableRipple>
      </View>
      <Text style={styles.circleText}>{title}</Text>
    </View>
  );
};
export default RenderCircle;
