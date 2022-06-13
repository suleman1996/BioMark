import {
  View,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  Text,
} from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

const RenderHealthRisk = ({ onPress, Svg, pan, color, healthRisk }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
        // dy: pan.y,
      },
    ]),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        { toValue: { x: 0, y: 0 } } // Back to zero
      ).start();
    },
  });

  console.log(color);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[pan.getLayout(), styles.healthRisk]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Svg fill={color} />

          {healthRisk?.name ? (
            <Text style={[styles.healthName]}>{healthRisk?.name}</Text>
          ) : null}
        </View>
        {healthRisk?.card_status ? (
          <Text style={styles.healthCardStatusName}>
            {healthRisk?.card_status}
          </Text>
        ) : null}
      </View>
      {healthRisk?.description ? (
        <Text style={styles.descriptionHealthRisk}>
          {healthRisk?.description}
          <TouchableWithoutFeedback onPress={onPress}>
            <Text style={[{ fontWeight: 'bold', color: colors.heading }]}>
              Tap here{' '}
            </Text>
          </TouchableWithoutFeedback>
          to complete your information
        </Text>
      ) : null}
    </Animated.View>
  );
};
export default RenderHealthRisk;
