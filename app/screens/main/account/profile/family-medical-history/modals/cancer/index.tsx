import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { DropdownMenu } from 'components/base';
import {
  RadioButtonQuestion,
  ModalWithBottomBtn,
} from 'components/higher-order';
import { GlobalStyles } from 'utils/theme/global-styles';

const options = [{ title: 'Blood' }, { title: 'Breast' }];

type Props = {
  isVisible: boolean;
};

const CancerModal = ({ isVisible }: Props) => {
  //    Have you been diagnosed with Cancer?
  const [ans1, setAns1] = useState(false);

  const [cancerType, setCancerType] = useState('');

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Cancer"
      onPress={() => console.log('clicked')}
    >
      <RadioButtonQuestion
        isTrue={ans1}
        setIsTrue={setAns1}
        question="Do any of your family members have or have had cancer?"
      />
      {ans1 ? (
        <>
          <Text style={GlobalStyles.qLabel}>Which type of cancer?</Text>
          <View style={{}}>
            <DropdownMenu
              options={options}
              onValueChange={setCancerType}
              selectedValue={cancerType}
            />
          </View>
        </>
      ) : null}
    </ModalWithBottomBtn>
  );
};

export default CancerModal;
