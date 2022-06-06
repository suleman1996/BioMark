import React, { useState } from 'react';
import { Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { DropdownMenu } from 'components/base';
import {
  ModalWithBottomBtn,
  RadioButtonQuestion,
} from 'components/higher-order';

import { GlobalStyles } from 'utils/theme/global-styles';

const options = [
  { label: 'Type 1 only', value: 'Type 1 only' },
  { label: 'Type 2 only', value: 'Type 2 only' },
];

type Props = {
  isVisible: boolean;
  setIsVisible: any;
};

const DiabetesModal = ({ isVisible, setIsVisible }: Props) => {
  const { colors } = useTheme();

  //    Have you been diagnosed with diabetes?
  const [ans1, setAns1] = useState(false);

  // Did you take any medications for this?
  const [ans2, setAns2] = useState(false);

  // diagnoesed type 1 only
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [dDiagnosedWith, setDiagnosedWith] = useState<any>();
  const [isDropdownChanged, setIsDropDownChanged] = useState(false);

  return (
    <ModalWithBottomBtn
      setIsVisible={setIsVisible}
      isVisible={isVisible}
      title="Diabetes"
      onPress={() => console.log('clicked')}
    >
      <RadioButtonQuestion
        isTrue={ans1}
        setIsTrue={setAns1}
        question="Have you been diagnosed with diabetes?"
      />
      <Text style={GlobalStyles(colors).qLabel}>
        What type of diabetes have you been diagnosed with?
      </Text>

      {/* <DropdownMenu
          options={options}
          setSelectedDropdown={setDiagnosedWith} 
        /> */}
      <DropdownMenu
        options={options}
        selectedValue={dDiagnosedWith}
        onValueChange={(value: any) => {
          setDiagnosedWith(value);
          setIsDropDownChanged(true);
        }}
        error={
          isDropdownChanged
            ? dDiagnosedWith === '---'
              ? 'Please select your ethnicity'
              : ''
            : ''
        }
      />

      <RadioButtonQuestion
        isTrue={ans2}
        setIsTrue={setAns2}
        question="Did you take any medications for this?"
      />
    </ModalWithBottomBtn>
  );
};

export default DiabetesModal;
