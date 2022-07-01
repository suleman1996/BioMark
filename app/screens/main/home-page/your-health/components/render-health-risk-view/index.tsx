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
  btnType,
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const authContext = useContext(AuthContext);

  return (
    <View
      style={{
        opacity:
          selectedHealthRisk == ''
            ? 1
            : name == selectedHealthRisk?.name
            ? 1
            : 0.3,
        flexDirection: 'row',
      }}
    >
      {console.log(
        'age ',
        authContext?.userData?.age,
        name === 'Diabetes' &&
          (authContext?.userData?.age < 30 ||
            authContext?.userData?.age > 74) &&
          btnType == 'none'
      )}
      <TouchableOpacity
        onPress={onRiskPress}
        style={[
          styles.renderHealthRisk,
          {
            backgroundColor: color,
          },
        ]}
      >
        <Svg />
      </TouchableOpacity>
      <View
        style={
          status == 'none'
            ? name === 'Diabetes' && btnType == 'none'
              ? styles.notDot
              : styles.dot
            : styles.notDot
        }
        // style={status == 'none' ? styles.dot : styles.notDot}
      />
    </View>
  );
};
export default RenderHealthRiskView;
