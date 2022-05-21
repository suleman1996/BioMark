import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Button } from 'components/base';

import makeStyles from './styles';

type Props = {
  onPress: any;
  disabled: boolean;
  title?: string;
  style: any;
};

const ButtonWithShadowContainer = ({
  title,
  onPress,
  disabled,
  style,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={[styles.container, style]}>
      <Button
        onPress={onPress}
        title={title ? title : 'Save'}
        disabled={disabled}
      />
    </View>
  );
};

export default ButtonWithShadowContainer;
