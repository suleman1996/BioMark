import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import ModalWithBottomBtn from '../../../../../../../components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from '../../../../../../../components/higher-order/radio-question';
import {goBack} from '../../../../../../../services/nav-ref';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
};

const AsthmaModal = ({isVisible, setIsVisible}: Props) => {
  //    Have you been diagnosed with asthma?
  const [ans1, setAns1] = useState(false);

  // Are you taking any medications for this?
  const [ans2, setAns2] = useState(false);

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Asthma"
      onPress={() => console.log('clicked')}>
      <RadioButtonQuestionComponent
        isTrue={ans1}
        setIsTrue={setAns1}
        question="Have you been diagnosed with asthma?"
      />
      <RadioButtonQuestionComponent
        isTrue={ans2}
        setIsTrue={setAns2}
        question="Are you talking any medications for this?"
      />
    </ModalWithBottomBtn>
  );
};

export default AsthmaModal;

const styles = StyleSheet.create({});
