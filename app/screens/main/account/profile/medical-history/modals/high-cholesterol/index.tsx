import React, { useState } from 'react';

import {
  ModalWithBottomBtn,
  RadioButtonQuestion,
} from 'components/higher-order';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
};

const HighCholesterolModal = ({ isVisible, setIsVisible }: Props) => {
  //    Have you been diagnosed with high cholesterol?
  const [ans1, setAns1] = useState(false);

  // Are you taking any medications for this?
  const [ans2, setAns2] = useState(false);

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={'High Cholesterol'}
      onPress={() => console.log('clicked')}
    >
      <RadioButtonQuestion
        isTrue={ans1}
        setIsTrue={setAns1}
        question="Have you been diagnosed with high cholesterol?"
      />
      <RadioButtonQuestion
        isTrue={ans2}
        setIsTrue={setAns2}
        question="Are you taking any medications for this?"
      />
    </ModalWithBottomBtn>
  );
};

export default HighCholesterolModal;
