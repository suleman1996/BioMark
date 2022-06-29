import { View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import AuthContext from 'utils/auth-context';

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
  const authContext = useContext(AuthContext);

  return (
    <>
      <TouchableOpacity
        onPress={onRiskPress}
        style={[
          styles.renderHealthRisk,
          {
            backgroundColor:
              selectedHealthRisk == ''
                ? color
                : name == selectedHealthRisk?.name
                ? color
                : colors.unSelectedHealthRisk,
          },
        ]}
      >
        <Svg />
      </TouchableOpacity>
      <View
        style={
          status == 'none'
            ? name === 'Heart Disease' &&
              (authContext?.userData?.age < 30 ||
                authContext?.userData?.age > 74)
              ? styles.notDot
              : styles.dot
            : styles.notDot
        }
      />
    </>
  );
};
export default RenderHealthRiskView;
