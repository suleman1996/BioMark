import React, { useState } from 'react';

import {
  ModalWithBottomBtn,
  RadioButtonQuestion,
} from 'components/higher-order';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
};

const GoutModal = ({ isVisible, setIsVisible }: Props) => {
  //    Have you been diagnosed with Gout?
  const [ans1, setAns1] = useState(false);

  // Are you taking any medications for this?
  const [ans2, setAns2] = useState(false);

  return (
    <ModalWithBottomBtn
      setIsVisible={setIsVisible}
      isVisible={isVisible}
      title="Gout"
      onPress={() => console.log('clicked')}
    >
      <RadioButtonQuestion
        isTrue={ans1}
        setIsTrue={setAns1}
        question="Have you been diagnosed with Gout?"
      />
      <RadioButtonQuestion
        isTrue={ans2}
        setIsTrue={setAns2}
        question="Are you taking any medications for this?"
      />
    </ModalWithBottomBtn>
  );
};

export default GoutModal;
