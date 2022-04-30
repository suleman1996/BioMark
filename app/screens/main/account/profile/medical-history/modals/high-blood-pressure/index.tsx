import React, { useState } from 'react';

import ModalWithBottomBtn from 'components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from 'components/higher-order/radio-question';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
};

const HighBloodPressureModal = ({ isVisible, setIsVisible }: Props) => {
  //    Have you been diagnosed with high blood pressure?
  const [ans1, setAns1] = useState(false);

  // Are you taking any medications for this?
  const [ans2, setAns2] = useState(false);

  return (
    <ModalWithBottomBtn
      setIsVisible={setIsVisible}
      isVisible={isVisible}
      title="High Blood Pressure"
      onPress={() => console.log('clicked')}
    >
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

export default HighBloodPressureModal;
