import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

import {
  ModalWithBottomBtn,
  RadioButtonQuestion,
} from 'components/higher-order';
import { TextInputButton } from 'components';

import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import { styles } from '../../styles';

type Props = {
  isVisible: boolean;
  listOther: any;
  refreshModal: boolean;
  addOther: Function;
  deleteOther: Function;
  valueOther: string;
  setvalueOther: Function;
  onDone: any;
};

const OtherModal = ({
  isVisible,
  listOther,
  refreshModal,
  addOther,
  deleteOther,
  valueOther,
  setvalueOther,
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
          <TextInputButton
            question="Please list these medications"
            placeholder="Enter medications"
            onChangeText={setvalueOther}
            value={valueOther}
            onPress={addOther}
          />
          <View style={styles.flatlistView}>
            <FlatList
              horizontal
              data={listOther}
              extraData={refreshModal}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.listview}
                  onPress={() => {
                    deleteOther(index);
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

export default OtherModal;
