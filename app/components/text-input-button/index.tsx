import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';

type Props = {
  question: string;
  onPress: any;
  onChangeText: any;
  value: any;
  placeholder: any;
  disabled: any;
};

const TextInputButton = ({
  question,
  onPress,
  onChangeText,
  value,
  placeholder,
  disabled,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          placeholder={placeholder}
          style={styles.input}
          activeUnderlineColor="transparent"
          underlineColor="transparent"
          clearButtonMode="always"
          onChangeText={onChangeText}
        />
        <Pressable style={styles.addBtn} onPress={onPress} disabled={disabled}>
          <Ionicons
            color={colors.darkGray}
            name="add"
            size={responsiveFontSize(22)}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TextInputButton;
