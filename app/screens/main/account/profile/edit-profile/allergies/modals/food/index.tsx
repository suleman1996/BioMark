import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';

import Entypo from 'react-native-vector-icons/Entypo';

import {
  ModalWithBottomBtn,
  RadioButtonQuestion,
} from 'components/higher-order';
import { TextInputButton } from 'components';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import { makeStyles } from '../../styles';

type Props = {
  isVisible: boolean;
  listFood: any;
  refreshModal: boolean;
  addFood: Function;
  deleteFood: Function;
  valueFood: string;
  setvalueFood: Function;
  onDone: any;
};

const FoodModal = ({
  isVisible,
  listFood,
  refreshModal,
  addFood,
  deleteFood,
  valueFood,
  setvalueFood,
  onDone,
}: Props) => {
  const [ans1, setAns1] = useState(false);
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Medication Allergies"
      onPress={onDone}
    >
      <RadioButtonQuestion isTrue={ans1} setIsTrue={setAns1} />
      {ans1 ? (
        <>
          <TextInputButton
            question="Please list these medications"
            placeholder="Enter medications"
            onChangeText={setvalueFood}
            value={valueFood}
            onPress={addFood}
          />
          <View style={styles.flatlistView}>
            <FlatList
              horizontal
              data={listFood}
              extraData={refreshModal}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.listview}
                  onPress={() => {
                    deleteFood(index);
                  }}
                >
                  <Text style={styles.listTextColor} key={item}>
                    {item}
                  </Text>
                  <Entypo
                    name={'cross'}
                    size={responsiveFontSize(15)}
                    color={colors.darkGray}
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

export default FoodModal;
