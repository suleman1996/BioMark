import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

import { TextInput } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalColors } from 'utils/theme/global-colors';

import { styles } from './styles';

type Props = {
  question: string;
};

const TagsCloudInputComponent = ({ question }: Props) => {
  const [tags, setTags] = useState([]);

  const onDelete = (item: any, index: number) => {
    setTags((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          activeUnderlineColor="transparent"
          underlineColor="transparent"
          onSubmitEditing={({ nativeEvent: { text } }) => {
            setTags((state) => [...state, text]);
          }}
        />
        <View style={styles.addBtn}>
          <Ionicons
            color={GlobalColors.primaryGray}
            name="add"
            size={responsiveFontSize(35)}
          />
        </View>
      </View>
      <View style={styles.tagsWrapper}>
        {tags?.map((item, index) => (
          <View style={styles.tag} key={index}>
            <Text style={styles.tagText}>{item}</Text>
            <Pressable onPress={() => onDelete(item, index)}>
              <Entypo
                color={'gray'}
                name="cross"
                size={responsiveFontSize(18)}
              />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TagsCloudInputComponent;
