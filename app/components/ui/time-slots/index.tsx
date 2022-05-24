import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {};

const TimeSlots = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [selected, setSelected] = useState(-1);

  const ifSelected = (index: number) => {
    return selected == index
      ? { backgroundColor: colors.primary }
      : { backgroundColor: colors.white };
  };

  const ifSelectedText = (index: number) => {
    return selected == index
      ? { color: colors.white }
      : { color: colors.smoke };
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6].map((item, index) => (
        <Pressable
          onPress={() => setSelected(index)}
          style={[styles.singleTimeItem, ifSelected(index)]}
        >
          <Text style={[styles.singleTimeItemText, ifSelectedText(index)]}>
            8:00AM
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default TimeSlots;
