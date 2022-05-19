import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Button } from 'components/base';

import makeStyles from './styles';

type Props = {
  onPress: any;
  disabled: boolean;
  title?: string;
};

const ButtonWithShadowContainer = ({ title, onPress, disabled }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <Button
        onPress={onPress}
        title={title ? title : 'Save'}
        disabled={disabled}
      />
    </View>
  );
};

export default ButtonWithShadowContainer;
