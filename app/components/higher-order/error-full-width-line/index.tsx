import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';

type Props = {
  error: string | undefined | null;
};
const ErrorLineFullWidth = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { error } = props;

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default ErrorLineFullWidth;
