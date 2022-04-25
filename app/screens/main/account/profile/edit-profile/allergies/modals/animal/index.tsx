import React, { useState } from 'react';

import ModalWithBottomBtn from 'components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from 'components/higher-order/radio-question';
import TextInput from 'components/text-input-button';

type Props = {
  isVisible: boolean;
};

const AnimalModal = ({ isVisible }: Props) => {
  //    Have you been diagnosed with Cancer?
  const [ans1, setAns1] = useState(false);

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Animal Allergies"
      onPress={() => console.log('clicked')}
    >
      <RadioButtonQuestionComponent isTrue={ans1} setIsTrue={setAns1} />
      {ans1 ? (
        <>
          <TextInput
            question="Please list these animals"
            placeholder="Enter animals"
          />
        </>
      ) : null}
    </ModalWithBottomBtn>
  );
};

export default AnimalModal;
