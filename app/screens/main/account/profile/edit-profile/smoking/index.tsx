import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
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
import { styles } from './styles';

export default function SmokingScreen() {

  const [value, setValue] = useState('');
  const [day, setDay] = useState('');
  const [stopSmoke, setStopSmoke] = useState('');
  const [startSmoke, setStartSmoke] = useState('');
  const [options, setOptions] = useState([
    { title: '----' },
    { title: 'Caucasian' },
    { title: 'Chinese' },
    { title: 'Filipino' },
    { title: 'Indian' },
    { title: 'Malay' },
    { title: 'Other / NA' },
  ])
  const options2 = [
    { title: '----' }, { title: '2020' }
  ]
  // const [options2, setOptions2] = useState([
  //   { title: '----' },
  //   { title: '2022' },
  //   { title: '2021' },
  // ])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackLayout title="Smoking">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>Do you smoke?</Text>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>

            <View style={[styles.radioContainer, { backgroundColor: value == 'first' ? '#054E8B' : null }]}>
              <RadioButton color={value == 'first' ? GlobalColors.white : null} value="first" />
              <Text style={[styles.radioText, { color: value == 'first' ? '#ffffff' : '#000000' }]}>No</Text>
            </View>

            <View style={[styles.radioContainer, { backgroundColor: value == 'second' ? '#054E8B' : null }]}>
              <RadioButton color={value == 'second' ? GlobalColors.white : null} value="second" />
              <Text style={[styles.radioText, { color: value == 'second' ? '#ffffff' : '#000000' }]}>Yes</Text>
            </View>

            <View style={[styles.radioContainer, { backgroundColor: value == 'third' ? '#054E8B' : null }]}>
              <RadioButton color={value == 'third' ? GlobalColors.white : null} value="third" />
              <Text style={[styles.radioText, { color: value == 'third' ? '#ffffff' : '#000000' }]}>I used to</Text>
            </View>
          </RadioButton.Group>

          {value !== 'first' ?
            <View>
              <Text style={styles.label}>How many cigarettes did you smoke per day?</Text>
              <View style={[styles.textinputView, { borderWidth: day ? 1 : null, borderRadius: day ? 5 : null }]}>
                <TextInput
                  placeholder="eg 1"
                  value={day}
                  onChange={setDay}
                  margin={0}
                  Keyboardtype='numeric'
                />
              </View>

              <Text style={styles.label}>Which year did you start smoking?</Text>
              <View style={styles.container2}>
                <Picker
                  selectedValue={startSmoke}
                  onValueChange={(itemValue, itemIndex) => setStartSmoke(itemValue)}>
                  <Picker.Item label="----" value=" " />
                  <Picker.Item label="Caucasian" value="Caucasian" />
                  <Picker.Item label="Chinese" value="Chinese" />
                  <Picker.Item label="Filipino" value="Filipino" />
                  <Picker.Item label="Indian" value="Indian" />
                  <Picker.Item label="Malay" value="Malay" />
                  <Picker.Item label="Other / NA" value="Other / NA" />
                </Picker>
                {/* <DropdownMenuComponent
                  options={options}
                  setSelectedDropdown={setOptions}
                /> */}
              </View>

              {value == 'third' ?
                <View>
                  <Text style={styles.label}>Which year did you stop smoking?</Text>
                  <View style={styles.container2}>
                    <Picker
                      selectedValue={stopSmoke}
                      onValueChange={(itemValue, itemIndex) => setStopSmoke(itemValue)}>
                      <Picker.Item label="----" value=" " />
                      <Picker.Item label="2020" value="2020" />
                      <Picker.Item label="2021" value="2021" />
                    </Picker>
                    {/* <DropdownMenuComponent
                      options={options2}
                      onValueChange={(title)=>{setStopSmoke(title)}}
                      // setSelectedDropdown={setOptions2}
                    /> */}
                  </View>
                </View>
                : null}
            </View>
            : null}
        </ScrollView>
        <ButtonWithShadowContainer title='Save' />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}

