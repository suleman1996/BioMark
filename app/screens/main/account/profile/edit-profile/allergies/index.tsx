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
import Textinput from '../../../../../../components/Text-input-button';
import { styles } from './styles';
import MedicationModal from './modals/medication';
import FoodModal from './modals/food'
import AnimalModal from './modals/animal';
import EnvironmentModal from './modals/environment';
import ModalButtonComponent from '../../../../../../components/higher-order/modal-button';
import OtherModal from './modals/other';


export default function AllergiesScreen() {

  const [value, setValue] = useState('');
  const [isMedicationModal, setIsMedicationModal] = useState(false);
  const [isFoodModal, setIsFoodModal] = useState(false);
  const [isAnimalModal, setIsAnimalModal] = useState(false);
  const [isEnvironmentModal, setIsEnvironmnetModal] = useState(false);
  const [isOtherModal, setIsOtherModal] = useState(false);
  const [isNotSureModal, setIsNotSureModal] = useState(false);

  const onPressMedication = () => {
    setIsMedicationModal(true)
  }

  const onPressFood = () => {
    setIsFoodModal(true)
  }

  const onPressAnimal = () => {
    setIsAnimalModal(true)
  }

  const onPressEnvironment = () => {
    setIsEnvironmnetModal(true)
  }

  const onPressOther = () => {
    setIsOtherModal(true)
  }

  const onPressNotSure = () => {
    setIsNotSureModal(true)
    setIsMedicationModal(false)
    setIsFoodModal(false)
    setIsAnimalModal(false)
    setIsEnvironmnetModal(false)
    setIsOtherModal(false)
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackLayout title="Allergies">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>Do you have any allergies?</Text>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>

            <View style={[styles.radioContainer, { backgroundColor: value == 'first' ? GlobalColors.navyblue  : null }]}>
              <RadioButton color={value == 'first' ? GlobalColors.white : null} value="first" />
              <Text style={[styles.radioText, { color: value == 'first' ? '#ffffff' : '#000000' }]}>No</Text>
            </View>

            <View style={[styles.radioContainer, { backgroundColor: value == 'second' ? GlobalColors.navyblue  : null }]}>
              <RadioButton color={value == 'second' ? GlobalColors.white : null} value="second" />
              <Text style={[styles.radioText, { color: value == 'second' ? '#ffffff' : '#000000' }]}>Yes</Text>
            </View>

            <View style={[styles.radioContainer, { backgroundColor: value == 'third' ? GlobalColors.navyblue  : null }]}>
              <RadioButton color={value == 'third' ? GlobalColors.white : null} value="third" />
              <Text style={[styles.radioText, { color: value == 'third' ? '#ffffff' : '#000000' }]}>Not Sure</Text>
            </View>
          </RadioButton.Group>

          {value == 'second' ?
            <>
              <Text style={styles.label}>What are you allergic to?</Text>
              <MedicationModal isVisible={isMedicationModal} setIsVisible={setIsMedicationModal} />
              <FoodModal isVisible={isFoodModal} setIsVisible={setIsFoodModal} />
              <View style={styles.rowContainer}>
                <ModalButtonComponent
                  title="Medication"
                  isModal={isMedicationModal}
                  setIsModal={onPressMedication}
                  drop={true}
                />
                <ModalButtonComponent
                  title="Food"
                  isModal={isFoodModal}
                  setIsModal={onPressFood}
                  drop={true}
                />
              </View>

              <AnimalModal isVisible={isAnimalModal} setIsVisible={setIsAnimalModal} />
              <EnvironmentModal isVisible={isEnvironmentModal} setIsVisible={setIsEnvironmnetModal} />
              <View style={styles.rowContainer}>
                <ModalButtonComponent
                  title="Animal"
                  isModal={isAnimalModal}
                  setIsModal={onPressAnimal}
                  drop={true}
                />
                <ModalButtonComponent
                  title="Environment"
                  isModal={isEnvironmentModal}
                  setIsModal={onPressEnvironment}
                  drop={true}
                />
              </View>

              <OtherModal isVisible={isOtherModal} setIsVisible={setIsOtherModal} />
              <View style={styles.rowContainer}>
                <ModalButtonComponent
                  title="Other"
                  isModal={isOtherModal}
                  setIsModal={onPressOther}
                  drop={true}
                />
                <ModalButtonComponent
                  title="Not Sure"
                  isModal={isNotSureModal}
                  setIsModal={onPressNotSure}
                // drop={true}
                />
              </View>
            </>
            : null}

        </ScrollView>
        <ButtonWithShadowContainer title='Save' />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}

