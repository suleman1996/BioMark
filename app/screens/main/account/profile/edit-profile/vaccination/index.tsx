import { Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';

import TitleWithBackLayout from 'components/layouts/back-with-title';
import ButtonWithShadowContainer from 'components/base/button-with-shadow-container';
import { GlobalColors } from 'utils/theme/global-colors';
import TextInput from 'components/text-input-button';
import { styles } from './styles';

export default function VaccinationScreen() {
  const [value, setValue] = useState('first');
  const [textInput, setTextInput] = useState('');

  const onChangeInput = (event: any) => {
    setTextInput(event);
  };

  const addTags = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackLayout title="Vaccinations">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>
            Have you been vaccinated as an adult?
          </Text>
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

            <TouchableOpacity
              onPress={() => setValue('third')}
              style={[
                styles.radioContainer,
                {
                  backgroundColor:
                    value == 'third' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == 'third' ? GlobalColors.white : null}
                value="third"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == 'third' ? '#ffffff' : '#000000' },
                ]}
              >
                Yes, but I'm not sure which vaccines
              </Text>
            </TouchableOpacity>
          </RadioButton.Group>

          {value == 'second' ? (
            <TextInput
              onPress={addTags}
              value={textInput}
              onChangeText={onChangeInput}
              question="Please list the vaccines:"
            />
          ) : null}
        </ScrollView>
        <ButtonWithShadowContainer title="Save" />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}
