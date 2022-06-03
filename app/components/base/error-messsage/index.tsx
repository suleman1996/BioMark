import React from 'react';
import { View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';

type Props = {
  errorMessage: string;
};

const ErrorMessage = ({ errorMessage }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <AntDesign
        color="white"
        name="warning"
        size={20}
        style={{ marginHorizontal: 20 }}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};
export default ErrorMessage;
