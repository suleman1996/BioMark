import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type Props = {
  error: string | undefined | null;
};
const ErrorLineFullWidth = (props: Props) => {
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
