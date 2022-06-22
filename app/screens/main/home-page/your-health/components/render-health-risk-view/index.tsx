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
  status,
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // console.log('Name a selected Name ', name, ' ', selectedHealthRisk?.name);

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
      <View style={status == 'none' ? styles.dot : styles.notDot} />
    </>
  );
};
export default RenderHealthRiskView;
