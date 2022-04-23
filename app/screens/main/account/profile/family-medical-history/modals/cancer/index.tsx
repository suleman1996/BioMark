import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropdownMenuComponent from '../../../../../../../components/base/dropdown-menu';
import ModalWithBottomBtn from '../../../../../../../components/higher-order/modal-with-bottom-btn';
import RadioButtonQuestionComponent from '../../../../../../../components/higher-order/radio-question';
import { heightToDp } from '../../../../../../../utils/functions/responsive-dimensions';
import { GlobalStyles } from '../../../../../../../utils/theme/global-styles';

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

  const [cancerType, setCancerType] = useState('');

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Cancer"
      onPress={() => console.log('clicked')}
    >
      <RadioButtonQuestionComponent
        isTrue={ans1}
        setIsTrue={setAns1}
        question="Do any of your family members have or have had cancer?"
      />
      {ans1 ? (
        <>
          <Text style={GlobalStyles.qLabel}>Which type of cancer?</Text>
          <View style={{}}>
            <DropdownMenuComponent
              options={options}
              setSelectedDropdown={setCancerType}
            />
          </View>
        </>
      ) : null}
    </ModalWithBottomBtn>
  );
};

export default CancerModal;

const styles = StyleSheet.create({});
