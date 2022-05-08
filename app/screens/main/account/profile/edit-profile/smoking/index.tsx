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
import { TextInput } from 'components';

import { GlobalColors } from 'utils/theme/global-colors';
import { userService } from 'services/user-service/user-service';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

import { options } from './year';
import { styles } from './styles';

export default function SmokingScreen() {
  const [value, setValue] = useState('0');
  const [day, setDay] = useState('');
  const [stopSmoke, setStopSmoke] = useState('');
  const [startSmoke, setStartSmoke] = useState('');
  const options2 = [{ title: '' }, { title: '2020' }, { title: '2021' }];

  const onSubmit = async () => {
    try {
      const response = await userService.Smoking(day, stopSmoke, startSmoke);
      console.log('smoking successful', response.data);
      navigate(SCREENS.EDIT_PROFILE);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackLayout title="Smoking">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>Do you smoke?</Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <TouchableOpacity
              onPress={() => setValue('0')}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == '0' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == '0' ? GlobalColors.white : null}
                value="0"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == '0' ? '#ffffff' : '#000000' },
                ]}
              >
                No
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue('1')}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == '1' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == '1' ? GlobalColors.white : null}
                value="1"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == '1' ? '#ffffff' : '#000000' },
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue('2')}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == '2' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == '2' ? GlobalColors.white : null}
                value="2"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == '2' ? '#ffffff' : '#000000' },
                ]}
              >
                I used to
              </Text>
            </TouchableOpacity>
          </RadioButton.Group>

          {value !== '0' ? (
            <View>
              <Text style={styles.label}>
                How many cigarettes did you smoke per day?
              </Text>
              <View
                style={[
                  styles.textinputView,
                  { borderWidth: day ? 1 : null, borderRadius: day ? 8 : null },
                ]}
              >
                <TextInput
                  value={day}
                  onChange={setDay}
                  margin={0}
                  keyboardType="numeric"
                  svg={undefined}
                />
              </View>

              <Text style={styles.label}>
                Which year did you start smoking?
              </Text>
              <View style={styles.container2}>
                <Picker
                  itemStyle={{ fontFamily: 'Rubik-Regular' }}
                  selectedValue={startSmoke}
                  onValueChange={(itemValue) => setStartSmoke(itemValue)}
                >
                  {options?.map((item, index) => {
                    return (
                      <Picker.Item
                        style={{ color: GlobalColors.darkGray }}
                        key={index}
                        label={item.title}
                        value={item.title}
                      />
                    );
                  })}
                </Picker>
              </View>

              {value == '2' ? (
                <View>
                  <Text style={styles.label}>
                    Which year did you stop smoking?
                  </Text>
                  <View style={styles.container2}>
                    <Picker
                      style={{ color: GlobalColors.darkGray }}
                      selectedValue={stopSmoke}
                      onValueChange={(itemValue) => setStopSmoke(itemValue)}
                    >
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
            </View>
          ) : null}
        </ScrollView>
        <ButtonWithShadowContainer title="Save" onPress={onSubmit} />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}
