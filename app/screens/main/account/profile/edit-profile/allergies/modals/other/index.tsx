import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropdownMenuComponent from '../../../../../../../../components/base/dropdown-menu';
import ModalWithBottomBtn from '../../../../../../../../components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from '../../../../../../../../components/higher-order/radio-question';
import { heightToDp } from '../../../../../../../../utils/functions/responsive-dimensions';
import { GlobalStyles } from '../../../../../../../../utils/theme/global-styles';
import Textinput from '../../../../../../../../components/text-input-button';

const options = [{ title: 'Blood' }, { title: 'Breast' }];

type Props = {
  isVisible: boolean;
  setIsVisible: any;
};

const OtherModal = ({ isVisible, setIsVisible }: Props) => {
  //    Have you been diagnosed with Cancer?
  const [ans1, setAns1] = useState(false);

  // Are you taking any medications for this?
  const [ans2, setAns2] = useState(false);

  const [cancerType, setCancerType] = useState('');

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Other allergies"
      onPress={() => console.log('clicked')}
    >
      <RadioButtonQuestionComponent isTrue={ans1} setIsTrue={setAns1} />
      {ans1 ? (
        <>
          <Textinput
            question="Please list these allergies"
            placeholder="Enter allergies"
          />
        </>
      ) : null}
    </ModalWithBottomBtn>
  );
};

export default OtherModal;

const styles = StyleSheet.create({});
