import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import Entypo from 'react-native-vector-icons/Entypo';
import ModalWithBottomBtn from 'components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from 'components/higher-order/radio-question';
import TextInput from 'components/text-input-button';
import { styles } from '../../styles';

type Props = {
  isVisible: boolean;
  listEnvironment: any;
  refreshModal: boolean;
  addEnvironment: Function;
  deleteEnvironment: Function;
  valueEnvironment: string;
  setvalueEnvironment: Function;
  onDone: any;
};

const EnvironmentModal = ({
  isVisible,
  listEnvironment,
  refreshModal,
  addEnvironment,
  deleteEnvironment,
  valueEnvironment,
  setvalueEnvironment,
  onDone,
}: Props) => {
  const [ans1, setAns1] = useState(false);

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Medication Allergies"
      onPress={onDone}
    >
      <RadioButtonQuestionComponent isTrue={ans1} setIsTrue={setAns1} />
      {ans1 ? (
        <>
          <TextInput
            question="Please list these medications"
            placeholder="Enter medications"
            onChangeText={setvalueEnvironment}
            value={valueEnvironment}
            onPress={addEnvironment}
          />
          <View style={styles.flatlistView}>
            <FlatList
              horizontal
              data={listEnvironment}
              extraData={refreshModal}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.listview}
                  onPress={() => {
                    deleteEnvironment(index);
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

export default EnvironmentModal;
