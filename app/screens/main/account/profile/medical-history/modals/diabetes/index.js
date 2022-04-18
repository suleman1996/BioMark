import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropdownMenuComponent from '../../../../../../../components/base/dropdown-menu';
import ModalWithBottomBtn from '../../../../../../../components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from '../../../../../../../components/higher-order/radio-question';
import TagsCloudInputComponent from '../../../../../../../components/higher-order/tags-cloud-input';
import { heightToDp } from '../../../../../../../utils/functions/responsiveDimentions';
import { GlobalStyles } from '../../../../../../../utils/theme/globalStyles';

const options = [{title: 'Type 1 only'}, {title: 'Type 2 only'}];


const DiabetesModal = ({isVisible, setIsVisible}) => {
  //    Have you been diagnosed with diabetes?
  const [ans1, setAns1] = useState(false);

  // Did you take any medications for this?
  const [ans2, setAns2] = useState(false);

  // diagnoesed type 1 only
  const [dDiagnosedWith, setDiagnosedWith] = useState('');

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Diabetes"
      onPress={() => console.log('clicked')}>
      <RadioButtonQuestionComponent
        isTrue={ans1}
        setIsTrue={setAns1}
        question="Have you been diagnosed with diabetes?"
      />
      <Text style={GlobalStyles.qLabel}>
        What type of diabetes have you been diagnosed with?
      </Text>
      <View style={{height: heightToDp(7), ...GlobalStyles.paddingHorizontal}}>
        <DropdownMenuComponent
          options={options}
          setSelectedDropdown={setDiagnosedWith}
        />
      </View>
      <RadioButtonQuestionComponent
        isTrue={ans2}
        setIsTrue={setAns2}
        question="Did you take any medications for this?"
      />
      <TagsCloudInputComponent question="Please list  medications?" />
    </ModalWithBottomBtn>
  );
};

export default DiabetesModal;

const styles = StyleSheet.create({});
