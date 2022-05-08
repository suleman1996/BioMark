import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';

import { goBack } from 'services/nav-ref';
import { GlobalColors } from 'utils/theme/global-colors';

import colors from 'assets/colors';

import { styles } from './styles';

const Options = [
  { title: '' },
  { title: '1' },
  { title: '2' },
  { title: '3' },
  { title: '4' },
  { title: '5' },
  { title: '6' },
  { title: '7' },
  { title: '8' },
  { title: '9' },
  { title: 'more than 10' },
];

const Options2 = [
  { title: '' },
  { title: 'less than 20 mins' },
  { title: '20-40 mins' },
  { title: '40-60 mins' },
  { title: '1-2 hours' },
  { title: '2-3 hours' },
  { title: 'more than 3 hours' },
];

export default function ExerciseScreen() {
  const [value, setValue] = useState('first');
  const [exerciseWeek, setExerciseWeek] = useState('');
  const [exerciseSession, setExerciseSession] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackLayout title="Exercise">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>Do you exercise?</Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <TouchableOpacity
              onPress={() => setValue('first')}
              style={[
                styles.radioContainer,
                {
                  backgroundColor:
                    value == 'first' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == 'first' ? GlobalColors.white : null}
                value="first"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == 'first' ? '#ffffff' : '#000000' },
                ]}
              >
                No
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue('second')}
              style={[
                styles.radioContainer,
                {
                  backgroundColor:
                    value == 'second' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == 'second' ? GlobalColors.white : null}
                value="second"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == 'second' ? '#ffffff' : '#000000' },
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
          </RadioButton.Group>

          {value !== 'first' ? (
            <View>
              <Text style={styles.label}>
                How many times do you exercise per week?
              </Text>
              <View style={[styles.container2]}>
                <Picker
                  selectedValue={exerciseWeek}
                  onValueChange={(itemValue) => setExerciseWeek(itemValue)}
                >
                  {Options?.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.title}
                        value={item.title}
                        color={colors.placeHolder}
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
                  onValueChange={(itemValue) => setExerciseSession(itemValue)}
                >
                  {Options2?.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.title}
                        value={item.title}
                        color={colors.placeHolder}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          ) : null}
        </ScrollView>
        <ButtonWithShadowContainer
          title="Save"
          onPress={() => {
            goBack();
          }}
        />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}
