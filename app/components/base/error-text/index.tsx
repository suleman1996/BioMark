import { Text, View } from 'react-native';
import React from 'react';

import { styles } from './styles';

type Props = {
  text: string | undefined;
};

const ErrorText = (props: Props) => {
  const { text } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{text}</Text>
    </View>
  );
};

export default ErrorText;
