import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropdownMenuComponent from '../../../../../../../../components/base/dropdown-menu';
import ModalWithBottomBtn from '../../../../../../../../components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from '../../../../../../../../components/higher-order/radio-question';
import { heightToDp } from '../../../../../../../../utils/functions/responsiveDimentions';
import { GlobalStyles } from '../../../../../../../../utils/theme/globalStyles';
import Textinput from '../../../../../../../../components/Textinput-button/textinput_button';

const options =[
  {title: 'Blood'},
  {title: 'Breast'}
]

type Props = {
  isVisible: boolean,
  setIsVisible: any,
};

const MedicationModal = ({isVisible, setIsVisible}: Props) => {
  //    Have you been diagnosed with Cancer?
  const [ans1, setAns1] = useState(false);

  // Are you taking any medications for this?
  const [ans2, setAns2] = useState(false);

  const [cancerType, setCancerType] = useState('');

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Medication Allergies"
      onPress={() => console.log('clicked')}>
      <RadioButtonQuestionComponent
        isTrue={ans1}
        setIsTrue={setAns1}
      />
     {ans1?(
      <>
        <Textinput question='Please list these medications' placeholder='Enter medications'/>
        </>
     ):null}
     
    </ModalWithBottomBtn>
  );
};

export default MedicationModal;

const styles = StyleSheet.create({});
