import { Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';

type Props = {
  text: string | undefined;
};

const ErrorText = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { text } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{text}</Text>
    </View>
  );
};

export default ErrorText;
