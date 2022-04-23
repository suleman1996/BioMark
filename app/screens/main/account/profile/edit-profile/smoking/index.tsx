import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Provider, Appbar, RadioButton } from 'react-native-paper';
import colors from '../../../../../../assets/colors/colors';
import fonts from '../../../../../../assets/fonts/fonts';
import TitleWithBackLayout from '../../../../../../components/layouts/back-with-title';
import ButtonWithShadowContainer from '../../../../../../components/base/button-with-shadow-container';
import DropdownMenuComponent from '../../../../../../components/base/dropdown-menu';
import { GlobalColors } from '../../../../../../utils/theme/globalColors';
import TextInput from '../../../../../../components/input-field/text-input';
import { Picker } from '@react-native-picker/picker';
import { options } from './year';
import { styles } from './styles';

export default function SmokingScreen() {

  const [value, setValue] = useState('first');
  const [day, setDay] = useState('');
  const [stopSmoke, setStopSmoke] = useState('');
  const [startSmoke, setStartSmoke] = useState('');
  const options2 = [{ title: '2020' }, { title: '2021' }]


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackLayout title="Smoking">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>Do you smoke?</Text>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>

            <TouchableOpacity onPress={()=>setValue('first')} style={[styles.radioContainer, { backgroundColor: value == 'first' ? GlobalColors.navyblue : null }]}>
              <RadioButton color={value == 'first' ? GlobalColors.white : null} value="first" />
              <Text style={[styles.radioText, { color: value == 'first' ? '#ffffff' : '#000000' }]}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setValue('second')} style={[styles.radioContainer, { backgroundColor: value == 'second' ? GlobalColors.navyblue : null }]}>
              <RadioButton color={value == 'second' ? GlobalColors.white : null} value="second" />
              <Text style={[styles.radioText, { color: value == 'second' ? '#ffffff' : '#000000' }]}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setValue('third')} style={[styles.radioContainer, { backgroundColor: value == 'third' ? GlobalColors.navyblue : null }]}>
              <RadioButton color={value == 'third' ? GlobalColors.white : null} value="third" />
              <Text style={[styles.radioText, { color: value == 'third' ? '#ffffff' : '#000000' }]}>I used to</Text>
            </TouchableOpacity>
          </RadioButton.Group>

          {value !== 'first' ?
            <View>
              <Text style={styles.label}>How many cigarettes did you smoke per day?</Text>
              <View style={[styles.textinputView, { borderWidth: day ? 1 : null, borderRadius: day ? 5 : null }]}>
                <TextInput
                  placeholder="eg : 1"
                  value={day}
                  onChange={setDay}
                  margin={0}
                  Keyboardtype='numeric'
                  svg={undefined}
                />
              </View>

              <Text style={styles.label}>Which year did you start smoking?</Text>
              <View style={styles.container2}>
                <Picker
                  itemStyle={{ height: 500, fontFamily: 'Rubik-Regular' }}
                  selectedValue={startSmoke}
                  onValueChange={(itemValue, itemIndex) => setStartSmoke(itemValue)}>
                  {options?.map((item, index) => {
                    return (
                      <Picker.Item key={index} label={item.title} value={item.title} />
                    );
                  })}
                </Picker>

              </View>

              {value == 'third' ?
                <View>
                  <Text style={styles.label}>Which year did you stop smoking?</Text>
                  <View style={styles.container2}>
                    <Picker
                      selectedValue={stopSmoke}
                      onValueChange={(itemValue, itemIndex) => setStopSmoke(itemValue)}>
                      {options2?.map((item, index) => {
                        return (
                          <Picker.Item key={index} label={item.title} value={item.title} />
                        );
                      })}
                    </Picker>
                  </View>
                </View>
                : null}
            </View>
            : null}
        </ScrollView>
        <ButtonWithShadowContainer title='Save' onPress={undefined} />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}

