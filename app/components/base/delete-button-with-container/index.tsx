import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';

type Props = {
  onPress: any;
  disabled: boolean;
  title?: string;
  style?: any;
};

const DeleteButtonContainer = ({ title, onPress, style }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteButtonContainer;
