import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import { GlobalColors } from 'utils/theme/global-colors';
import { styles } from './styles';
import MedicationModal from './modals/medication';
import FoodModal from './modals/food';
import AnimalModal from './modals/animal';
import EnvironmentModal from './modals/environment';
import { ModalButton } from 'components/higher-order';
import { userService } from 'services/user-service/user-service';
import OtherModal from './modals/other';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

export default function AllergiesScreen() {
  const [value, setValue] = useState('');
  const [isMedicationModal, setIsMedicationModal] = useState(false);
  const [isFoodModal, setIsFoodModal] = useState(false);
  const [isAnimalModal, setIsAnimalModal] = useState(false);
  const [isEnvironmentModal, setIsEnvironmentModal] = useState(false);
  const [isOtherModal, setIsOtherModal] = useState(false);
  const [isNotSureModal, setIsNotSureModal] = useState(false);
  const [conditions, setConditions] = useState([]);
  // medical states
  /*eslint-disable no-unused-vars*/
  const [listMedical] = useState([]);
  const [refreshMedical, setRefreshMedical] = useState(false);
  const [valueMedical, setValueMedical] = useState('');
  //food states
  /* eslint-disable no-unused-vars*/
  const [listFoods] = useState([]);
  const [refreshFoods, setRefreshFoods] = useState(false);
  const [valueFoods, setValueFoods] = useState('');
  //animals state
  /* eslint-disable no-unused-vars*/
  const [listAnimals] = useState([]);
  const [refreshAnimals, setRefreshAnimals] = useState(false);
  const [valueAnimals, setValueAnimals] = useState('');
  // Environment states
  /* eslint-disable no-unused-vars*/
  const [listEnviroment] = useState([]);
  const [refreshEnviroment, setRefreshEnviroment] = useState(false);
  const [valueEnviroment, setValueEnviroment] = useState('');
  // others states
  /* eslint-disable no-unused-vars*/
  const [listOthers] = useState([]);
  const [refreshOther, setRefreshOther] = useState(false);
  const [valueOther, setValueOther] = useState('');

  const onPressMedication = () => {
    setIsMedicationModal(true);
  };

  const onPressFood = () => {
    setIsFoodModal(true);
  };

  const onPressAnimal = () => {
    setIsAnimalModal(true);
  };

  const onPressEnvironment = () => {
    setIsEnvironmentModal(true);
  };

  const onPressOther = () => {
    setIsOtherModal(true);
  };

  const onPressNotSure = () => {
    setIsNotSureModal(true);
    setIsMedicationModal(false);
    setIsFoodModal(false);
    setIsAnimalModal(false);
    setIsEnvironmentModal(false);
    setIsOtherModal(false);
    setConditions([]);
  };
  const onDoneMedical = ({ allergyTo }) => {
    let body = {
      has_condition: true,
      allergy_to: allergyTo,
      allergy_type: listMedical.toString(),
    };
    conditions.push(body);
  };
  const onDoneFood = ({ allergyTo }) => {
    let body = {
      has_condition: true,
      allergy_to: allergyTo,
      allergy_type: listFoods.toString(),
    };
    conditions.push(body);
  };
  const onDoneAnimal = ({ allergyTo }) => {
    let body = {
      has_condition: true,
      allergy_to: allergyTo,
      allergy_type: listAnimals.toString(),
    };
    conditions.push(body);
  };
  const onDoneEnvironment = ({ allergyTo }) => {
    let body = {
      has_condition: true,
      allergy_to: allergyTo,
      allergy_type: listEnviroment.toString(),
    };
    conditions.push(body);
  };
  const onDoneOther = ({ allergyTo }) => {
    let body = {
      has_condition: true,
      allergy_to: allergyTo,
      allergy_type: listOthers.toString(),
    };
    conditions.push(body);
  };

  const onSubmit = async () => {
    console.log(conditions);
    try {
      if (conditions.length > 0) {
        const response = await userService.Allergies({
          conditions: conditions,
        });
        console.log('Allergies successful', response.data);
        navigate(SCREENS.EDIT_PROFILE);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addMedicalFunction = () => {
    if (valueMedical !== '') {
      listMedical.push(valueMedical);
      setRefreshMedical(!refreshMedical);
      setValueMedical(!valueMedical);
    }
  };
  const addFoodsFunction = () => {
    if (valueFoods !== '') {
      listFoods.push(valueFoods);
      setRefreshFoods(!refreshFoods);
      setValueFoods(!valueFoods);
    }
  };
  const addAnimalsFunction = () => {
    if (valueAnimals !== '') {
      listAnimals.push(valueAnimals);
      setRefreshAnimals(!refreshAnimals);
      setValueAnimals(!valueAnimals);
    }
  };
  const addEnvironmentFunction = () => {
    if (valueEnviroment !== '') {
      listEnviroment.push(valueEnviroment);
      setRefreshEnviroment(!refreshEnviroment);
      setValueEnviroment(!valueEnviroment);
    }
  };
  const addOtherFunction = () => {
    if (valueOther !== '') {
      listOthers.push(valueOther);
      setRefreshOther(!refreshOther);
      setValueOther(!valueOther);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackLayout title="Allergies">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>Do you have any allergies?</Text>
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
                Not Sure
              </Text>
            </TouchableOpacity>
          </RadioButton.Group>

          {value == 'second' ? (
            <>
              <Text style={styles.label}>What are you allergic to?</Text>
              <MedicationModal
                listMedical={listMedical}
                onDone={() => onDoneMedical({ allergyTo: 'Medication' })}
                isVisible={isMedicationModal}
                setValueMedical={setValueMedical}
                valueMedical={valueMedical}
                addMedical={addMedicalFunction}
                deleteMedical={(index) => {
                  listMedical.splice(index, 1),
                    setRefreshMedical(!refreshMedical);
                }}
                setIsVisible={setIsMedicationModal}
              />
              <FoodModal
                listFood={listFoods}
                setvalueFood={setValueFoods}
                onDone={() => onDoneFood({ allergyTo: 'Food' })}
                valueFood={valueFoods}
                addFood={addFoodsFunction}
                deleteFood={(index) => {
                  listFoods.splice(index, 1), setRefreshFoods(!refreshFoods);
                }}
                isVisible={isFoodModal}
                setIsVisible={setIsFoodModal}
              />
              <View style={styles.rowContainer}>
                <ModalButton
                  title="Medication"
                  isModal={isMedicationModal}
                  setIsModal={() => onPressMedication()}
                  drop={true}
                />
                <ModalButton
                  title="Food"
                  isModal={isFoodModal}
                  setIsModal={() => onPressFood()}
                  drop={true}
                />
              </View>
              <AnimalModal
                listAnimal={listAnimals}
                setvalueAnimal={setValueAnimals}
                onDone={() => onDoneAnimal({ allergyTo: 'Animal' })}
                valueAnimal={valueAnimals}
                addAnimal={addAnimalsFunction}
                deleteAnimal={(index) => {
                  listAnimals.splice(index, 1),
                    setRefreshAnimals(!refreshAnimals);
                }}
                isVisible={isAnimalModal}
                setIsVisible={setIsAnimalModal}
              />
              <EnvironmentModal
                listEnvironment={listEnviroment}
                setvalueEnvironment={setValueEnviroment}
                onDone={() => onDoneEnvironment({ allergyTo: 'Environment' })}
                valueEnvironment={valueEnviroment}
                addEnvironment={addEnvironmentFunction}
                deleteEnvironment={(index) => {
                  listEnviroment.splice(index, 1),
                    setRefreshEnviroment(!refreshEnviroment);
                }}
                isVisible={isEnvironmentModal}
                setIsVisible={setIsEnvironmentModal}
              />
              <View style={styles.rowContainer}>
                <ModalButton
                  title="Animal"
                  isModal={isAnimalModal}
                  setIsModal={() => onPressAnimal()}
                  drop={true}
                />
                <ModalButton
                  title="Environment"
                  isModal={isEnvironmentModal}
                  setIsModal={() => onPressEnvironment()}
                  drop={true}
                />
              </View>

              <OtherModal
                listOther={listOthers}
                setvalueOther={setValueOther}
                onDone={() => onDoneOther({ allergyTo: 'Other' })}
                valueOther={valueOther}
                addOther={addOtherFunction}
                deleteOther={(index) => {
                  listOthers.splice(index, 1), setRefreshOther(!refreshOther);
                }}
                isVisible={isOtherModal}
                setIsVisible={setIsOtherModal}
              />
              <View style={styles.rowContainer}>
                <ModalButton
                  title="Other"
                  isModal={isOtherModal}
                  setIsModal={() => onPressOther()}
                  drop={true}
                />
                <ModalButton
                  title="Not Sure"
                  isModal={isNotSureModal}
                  setIsModal={() => onPressNotSure()}
                />
              </View>
            </>
          ) : null}
        </ScrollView>
        <ButtonWithShadowContainer title="Save" onPress={onSubmit} />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}
