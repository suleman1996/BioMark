import React from 'react';
import { View } from 'react-native';

import { Button } from 'components/base';

import { styles } from './styles';
type Props = {
  onPress: any;
  disabled: boolean;
  title?: string;
};

const ButtonWithShadowContainer = ({ title, onPress, disabled }: Props) => {
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
