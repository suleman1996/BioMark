import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Pressable } from 'react-native';

import { TextInput } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';

type Props = {
  question: string;
  setData: any;
  data: any;
  placeholder?: string;
};

const TagsCloudInputComponent = ({
  question,
  setData,
  data,
  placeholder,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [tags, setTags] = useState([]);
  const [singleTag, setSingleTag] = useState<string>('');
  const ref = useRef<any>();

  useEffect(() => {
    setTags(data);
  }, [data]);

  const onDelete = (item: any, index: number) => {
    setTags((prevState) => {
      const d = prevState.filter((_, i) => i !== index);
      setData(d);
      return d;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          style={styles.input}
          activeUnderlineColor="transparent"
          underlineColor="transparent"
          onChangeText={setSingleTag}
          value={singleTag}
          placeholder={placeholder}
          onSubmitEditing={({ nativeEvent: { text } }) => {
            if (text.trim() !== '') {
              setTags((state) => {
                setData([...state, text]);
                return [...state, text];
              });
              setSingleTag('');
            }
          }}
        />
        <Pressable
          onPress={() => {
            if (singleTag.trim() !== '') {
              setTags((state: any) => {
                setData([...state, singleTag]);
                return [...state, singleTag];
              });
              setSingleTag('');
            }
          }}
          style={styles.addBtn}
        >
          <Ionicons
            color={colors.primaryGray}
            name="add"
            size={responsiveFontSize(35)}
          />
        </Pressable>
      </View>
      <View style={styles.tagsWrapper}>
        {tags?.map((item, index) => (
          <View key={index} style={styles.tag}>
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
