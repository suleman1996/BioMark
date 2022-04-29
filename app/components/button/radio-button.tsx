import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton as PaperRadioButton } from 'react-native-paper';

const RadioButton = () => {
  const [value, setValue] = React.useState('first');

  return (
    <PaperRadioButton.Group
      onValueChange={(newValue) => setValue(newValue)}
      value={value}
    >
      <View style={styles.container}>
        <View style={styles.rBtn}>
          <PaperRadioButton value="first" />
        </View>
        <View style={styles.rBtn}>
          <PaperRadioButton value="second" />
        </View>
        <View style={styles.rBtn}>
          <PaperRadioButton value="third" />
        </View>
      </View>
    </PaperRadioButton.Group>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rBtn: {
    borderRadius: 8,
    width: '30%',
  },
});
