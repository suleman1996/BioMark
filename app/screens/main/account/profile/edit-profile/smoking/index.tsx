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
  const options = [
    { title: null },
    { title: '1990' },
    { title: '1991' },
    { title: '1992' },
    { title: '1993' },
    { title: '1994' },
    { title: '1995' },
    { title: '1996' },
    { title: '1997' },
    { title: '1998' },
    { title: '1999' },
    { title: '2000' },
    { title: '2001' },
    { title: '2002' },
    { title: '2003' },
    { title: '2004' },
    { title: '2005' },
    { title: '2006' },
    { title: '2007' },
    { title: '2008' },
    { title: '2009' },
    { title: '2010' },
    { title: '2011' },
    { title: '2012' },
    { title: '2013' },
    { title: '2014' },
    { title: '2015' },
    { title: '2016' },
    { title: '2017' },
    { title: '2018' },
    { title: '2019' },
    { title: '2020' },
    { title: '2021' },
    { title: '2022' },
  ]
  const options2 = [
    { title: null }, { title: '2020' },{ title:'2021'}
  ]

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
                  placeholder="eg : 1"
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
        <ButtonWithShadowContainer title='Save' />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}

