import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';

const MyComponent = () => {
  const [value, setValue] = React.useState('first');

  return (
    <RadioButton.Group
      onValueChange={newValue => setValue(newValue)}
      value={value}>
      <View style={styles.container}>
        <View style={styles.rBtn}>
          <RadioButton value="first" />
        </View>
        <View style={styles.rBtn}>
          <RadioButton value="second" />
        </View>
        <View style={styles.rBtn}>
          <RadioButton value="third" />
        </View>
      </View>
    </RadioButton.Group>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    // borderWidth:1,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  rBtn: {
    
    // borderWidth: 1,
    borderRadius:8,
    width:'30%',

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 3,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,

    // elevation: 5,
  },
});
