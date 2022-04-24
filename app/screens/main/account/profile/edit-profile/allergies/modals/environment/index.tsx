import React, { useState } from 'react';

import ModalWithBottomBtn from 'components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from 'components/higher-order/radio-question';
import TextInput from 'components/text-input-button';

const options = [{ title: 'Blood' }, { title: 'Breast' }];

type Props = {
  isVisible: boolean;
  setIsVisible: any;
};

const EnvironmentModal = ({ isVisible, setIsVisible }: Props) => {
  //    Have you been diagnosed with Cancer?
  const [ans1, setAns1] = useState(false);

  // Are you taking any medications for this?
  const [ans2, setAns2] = useState(false);

  const [cancerType, setCancerType] = useState('');

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Environment Allergies"
      onPress={() => console.log('clicked')}
    >
      <RadioButtonQuestionComponent isTrue={ans1} setIsTrue={setAns1} />
      {ans1 ? (
        <>
          <TextInput
            question="Please list these environmental allergies"
            placeholder="Enter environmental allergie"
          />
        </>
      ) : null}
    </ModalWithBottomBtn>
  );
};

export default EnvironmentModal;
