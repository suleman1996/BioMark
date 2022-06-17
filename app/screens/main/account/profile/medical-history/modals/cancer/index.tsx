import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { DropdownMenu } from 'components/base';
import {
  ModalWithBottomBtn,
  RadioButtonQuestion,
} from 'components/higher-order';

import { heightToDp } from 'utils/functions/responsive-dimensions';
import { GlobalStyles } from 'utils/theme/global-styles';

const options = [{ title: 'Blood' }, { title: 'Breast' }];

type Props = {
  isVisible: boolean;
  setIsVisible: any;
};

const CancerModal = ({ isVisible, setIsVisible }: Props) => {
  //    Have you been diagnosed with Cancer?
  const [ans1, setAns1] = useState(false);

  // Are you taking any medications for this?
  const [ans2, setAns2] = useState(false);
  const { colors } = useTheme();

  const [cancerType, setCancerType] = useState('');

  return (
    <ModalWithBottomBtn
      setIsVisible={setIsVisible}
      isVisible={isVisible}
      title="Cancer"
      onPress={() => console.log('clicked')}
    >
      <RadioButtonQuestion
        isTrue={ans1}
        setIsTrue={setAns1}
        question="Have you been diagnosed with Cancer?"
      />
      <Text style={GlobalStyles(colors).qLabel}>Which type of cancer?</Text>
      <View
        style={{
          height: heightToDp(7),
          ...GlobalStyles(colors).paddingHorizontal,
        }}
      >
        <DropdownMenu
          options={options}
          selectedValue={cancerType}
          onValueChange={setCancerType}
        />
      </View>

      <RadioButtonQuestion
        isTrue={ans2}
        setIsTrue={setAns2}
        question="Are you still under treatment for this?"
      />
    </ModalWithBottomBtn>
  );
};

export default CancerModal;
