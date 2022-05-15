import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { GlobalColors } from 'utils/theme/global-colors';

import makeStyles from './styles';

type Props = {
  options: any;
  label: string;
  value: number | string;
  onChange: any;
  isTitleSelect?: boolean;
};

const BoxSelector = ({
  options,
  label,
  value,
  onChange,
  isTitleSelect = false,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const selectedStyles = { backgroundColor: GlobalColors.primary };
  const selectedTextStyle = { color: GlobalColors.white };

  if (isTitleSelect) {
    return (
      <View style={styles.main}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <FlatList
          style={styles.container}
          horizontal
          data={options}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => onChange(item.title)}
              key={index}
              style={[styles.button, value == item.title ? selectedStyles : {}]}
            >
              <Text style={[value == item.title ? selectedTextStyle : {}]}>
                {item.title}
              </Text>
            </Pressable>
          )}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.main}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <FlatList
          style={styles.container}
          horizontal
          data={options}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => onChange(item.id)}
              key={index}
              style={[styles.button, value == item.id ? selectedStyles : {}]}
            >
              <Text style={[value == item.id ? selectedTextStyle : {}]}>
                {item.title}
              </Text>
            </Pressable>
          )}
        />
      </View>
    );
  }
};

export default BoxSelector;
