import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

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

const styles = StyleSheet.create({
  container: {},
  question: {
    paddingHorizontal: widthToDp(4),
    fontSize: responsiveFontSize(23),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '85%',
    height: heightToDp(6),
    borderRadius: widthToDp(2),
    marginTop: heightToDp(2),
    marginRight: widthToDp(2),
    backgroundColor: GlobalColors.primaryGray,
  },
  addBtn: {
    width: widthToDp(20),
    height: heightToDp(6),
    borderRadius: widthToDp(5),
    backgroundColor: GlobalColors.primary,
    position: 'absolute',
    right: widthToDp(4),
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: widthToDp(4),
    marginTop: heightToDp(3),
  },
  tag: {
    borderWidth: 1,
    borderColor: GlobalColors.darkPrimary,
    paddingHorizontal: widthToDp(3),
    paddingVertical: widthToDp(2),
    borderRadius: widthToDp(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: widthToDp(3),
    marginTop: heightToDp(1.5),
  },
  tagText: {
    marginRight: widthToDp(2),
    fontFamily: GlobalFonts.regular,
    fontSize: responsiveFontSize(15),
  },
});
