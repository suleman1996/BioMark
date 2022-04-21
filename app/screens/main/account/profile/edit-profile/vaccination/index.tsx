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

export default function VaccinationScreen() {

  const [value, setValue] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackLayout title="Vaccinations">
        <Text style={styles.label}>Have you been vaccinated as an adult?</Text>
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
            <Text style={[styles.radioText, { color: value == 'third' ? '#ffffff' : '#000000' }]}>Yes, but I'm not sure which vaccines</Text>
          </View>
        </RadioButton.Group>

        {value == 'second' ?
        <Text style={styles.label}>Please list the vaccines:</Text>
        :null}


        <ButtonWithShadowContainer title='Save' />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}

