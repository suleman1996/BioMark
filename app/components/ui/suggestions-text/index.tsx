import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { makeStyles } from './styles';

type Props = {};

const SuggestionsText = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>What appointment will be shown?</Text>
    </View>
  );
};

export default SuggestionsText;
