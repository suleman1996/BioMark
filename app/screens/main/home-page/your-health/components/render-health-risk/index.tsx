import {
  View,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import makeStyles from './styles';
import RenderSvg from 'components/render-svg';

const RenderHealthRisk = ({
  description,
  name,
  card_status,
  onPress,
  id,
  colorr,
  pan,
}) => {
  console.log('pan', pan.getLayout());

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
          <RenderSvg color={colorr} id={id} />

          <Text style={[styles.healthName]}>{name}</Text>
        </View>
        <Text style={styles.healthCardStatusName}>{card_status}</Text>
      </View>
      <Text style={styles.descriptionHealthRisk}>
        {description}
        <TouchableWithoutFeedback onPress={onPress}>
          <Text style={[{ fontWeight: 'bold', color: colors.heading }]}>
            Tap here{' '}
          </Text>
        </TouchableWithoutFeedback>
        to complete your information
      </Text>
    </Animated.View>
  );
};
export default RenderHealthRisk;
