import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ModalWithBottomBtn from '../../../../../../../components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from '../../../../../../../components/higher-order/radio-question';

const HighCholesterolModal = ({isVisible, setIsVisible}) => {

//    Have you been diagnosed with high cholesterol? 
  const [ans1, setAns1] = useState(false);

// Are you taking any medications for this?
  const [ans2, setAns2] = useState(false);

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title={'High Cholesterol'}
      onPress={() => console.log('clicked')}>
      <RadioButtonQuestionComponent
        isTrue={ans1}
        setIsTrue={setAns1}
        question="Have you been diagnosed with high cholesterol?"
      />
      <RadioButtonQuestionComponent
        isTrue={ans2}
        setIsTrue={setAns2}
        question="Are you taking any medications for this?"
      />
    </ModalWithBottomBtn>
  );
};

export default HighCholesterolModal;

const styles = StyleSheet.create({});
