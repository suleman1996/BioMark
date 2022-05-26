import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';

type Props = { svg: any };

const Index = (props: Props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  return (
    <LinearGradient
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      colors={['#2C6CFC', '#2CBDFC']}
      style={styles.container}
    >
      <TouchableOpacity>{props.svg}</TouchableOpacity>
    </LinearGradient>
  );
};

export default Index;
