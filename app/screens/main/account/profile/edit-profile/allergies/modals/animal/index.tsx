import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

import {
  ModalWithBottomBtn,
  RadioButtonQuestion,
} from 'components/higher-order';
import { TextInput } from 'components';

import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import { styles } from '../../styles';

type Props = {
  isVisible: boolean;
  listAnimal: any;
  refreshModal: boolean;
  addAnimal: Function;
  deleteAnimal: Function;
  valueAnimal: string;
  setvalueAnimal: Function;
  onDone: any;
};

const AnimalFood = ({
  isVisible,
  listAnimal,
  refreshModal,
  addAnimal,
  deleteAnimal,
  valueAnimal,
  setvalueAnimal,
  onDone,
}: Props) => {
  const [ans1, setAns1] = useState(false);

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Medication Allergies"
      onPress={onDone}
    >
      <RadioButtonQuestion isTrue={ans1} setIsTrue={setAns1} />
      {ans1 ? (
        <>
          <TextInput
            question="Please list these medications"
            placeholder="Enter medications"
            onChangeText={setvalueAnimal}
            value={valueAnimal}
            onPress={addAnimal}
          />
          <View style={styles.flatlistView}>
            <FlatList
              horizontal
              data={listAnimal}
              extraData={refreshModal}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.listview}
                  onPress={() => {
                    deleteAnimal(index);
                  }}
                >
                  <Text style={styles.listTextColor} key={item}>
                    {item}
                  </Text>
                  <Entypo
                    name={'cross'}
                    size={responsiveFontSize(15)}
                    color={GlobalColors.darkGray}
                    style={styles.crossIcon}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      ) : null}
    </ModalWithBottomBtn>
  );
};

export default AnimalFood;
