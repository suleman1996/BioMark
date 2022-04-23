import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {Provider, Appbar, RadioButton} from 'react-native-paper';
import TitleWithBackLayout from '../../../../../../components/layouts/back-with-title';
import ButtonWithShadowContainer from '../../../../../../components/base/button-with-shadow-container';
import {GlobalColors} from '../../../../../../utils/theme/globalColors';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';

export default function ExerciseScreen() {
  const [value, setValue] = useState('first');
  const [day, setDay] = useState('');
  const [exerciseWeek, setexerciseWeek] = useState('');
  const [exerciseSession, setexerciseSession] = useState('');
  const options = [
    {title: '1'},
    {title: '2'},
    {title: '3'},
    {title: '4'},
    {title: '5'},
    {title: '6'},
    {title: '7'},
    {title: '8'},
    {title: '9'},
    {title: 'more than 10'},
  ];
  const options2 = [
    {title: 'less than 20 mins'},
    {title: '20-40 mins'},
    {title: '40-60 mins'},
    {title: '1-2 hours'},
    {title: '2-3 hours'},
    {title: 'more than 3 hours'},
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <TitleWithBackLayout title="Exercise">
        <ScrollView style={{flex: 1, marginBottom: 100}}>
          <Text style={styles.label}>Do you exercise?</Text>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View
              style={[
                styles.radioContainer,
                {backgroundColor: value == 'first' ? '#054E8B' : null},
              ]}>
              <RadioButton
                color={value == 'first' ? GlobalColors.white : null}
                value="first"
              />
              <Text
                style={[
                  styles.radioText,
                  {color: value == 'first' ? '#ffffff' : '#000000'},
                ]}>
                No
              </Text>
            </View>

            <View
              style={[
                styles.radioContainer,
                {backgroundColor: value == 'second' ? '#054E8B' : null},
              ]}>
              <RadioButton
                color={value == 'second' ? GlobalColors.white : null}
                value="second"
              />
              <Text
                style={[
                  styles.radioText,
                  {color: value == 'second' ? '#ffffff' : '#000000'},
                ]}>
                Yes
              </Text>
            </View>
          </RadioButton.Group>

          {value !== 'first' ? (
            <View>
              <Text style={styles.label}>
                How many times do you exercise per week?
              </Text>
              <View style={[styles.container2]}>
                <Picker
                  selectedValue={exerciseWeek}
                  onValueChange={(itemValue, itemIndex) =>
                    setexerciseWeek(itemValue)
                  }>
                  {options?.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.title}
                        value={item.title}
                      />
                    );
                  })}
                </Picker>
              </View>

              <Text style={styles.label}>
                How long do you exercise per session?
              </Text>
              <View style={styles.container2}>
                <Picker
                  selectedValue={exerciseSession}
                  onValueChange={(itemValue, itemIndex) =>
                    setexerciseSession(itemValue)
                  }>
                  {options2?.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.title}
                        value={item.title}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          ) : null}
        </ScrollView>
        <ButtonWithShadowContainer title="Save" />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}
