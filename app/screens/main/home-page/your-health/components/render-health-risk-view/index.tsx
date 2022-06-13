import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

const RenderHealthRiskView = ({
  Svg,
  color,
  selectedHealthRisk,
  onRiskPress,
  name,
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <TouchableOpacity
        onPress={onRiskPress}
        style={[
          styles.renderHealthRisk,
          {
            backgroundColor:
              name == selectedHealthRisk?.name ? colors.lightGrey : color,
          },
        ]}
      >
        <Svg />
      </TouchableOpacity>
      <View style={styles.dot} />
    </>
  );
};
export default RenderHealthRiskView;
