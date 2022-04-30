import React, { useState } from 'react';
import { Text, View } from 'react-native';

import DropdownMenuComponent from 'components/base/dropdown-menu';
import ModalWithBottomBtn from 'components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from 'components/higher-order/radio-question';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { GlobalStyles } from 'utils/theme/global-styles';

const options = [{ title: 'Type 1 only' }, { title: 'Type 2 only' }];

type Props = {
  isVisible: boolean;
  setIsVisible: any;
};

const DiabetesModal = ({ isVisible, setIsVisible }: Props) => {
  //    Have you been diagnosed with diabetes?
  const [ans1, setAns1] = useState(false);

  // Did you take any medications for this?
  const [ans2, setAns2] = useState(false);

  // diagnoesed type 1 only
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dDiagnosedWith, setDiagnosedWith] = useState('');

  return (
    <ModalWithBottomBtn
      setIsVisible={setIsVisible}
      isVisible={isVisible}
      title="Diabetes"
      onPress={() => console.log('clicked')}
    >
      <RadioButtonQuestionComponent
        isTrue={ans1}
        setIsTrue={setAns1}
        question="Have you been diagnosed with diabetes?"
      />
      <Text style={GlobalStyles.qLabel}>
        What type of diabetes have you been diagnosed with?
      </Text>
      <View
        style={{ height: heightToDp(7), ...GlobalStyles.paddingHorizontal }}
      >
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
    </ModalWithBottomBtn>
  );
};

export default DiabetesModal;
