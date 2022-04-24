import {View, Text} from 'react-native';
import React, { useState } from 'react';
import {styles} from './styles';
import TitleWithBackWhiteBgLayout from '../../../../../components/layouts/back-with-title-white-bg';
import CheckBox from '../../../../../components/check-box/check-box';
import {GlobalColors} from '../../../../../utils/theme/globalColors';
import {widthToDp} from '../../../../../utils/functions/responsiveDimentions';
import CheckBoxWithText from '../../../../../components/base/checkbox-with-text';
import MarketingConsentModal from '../../../../../components/ui/marketing-consent-modal';
import ButtonComponent from '../../../../../components/base/button';
type Props = {};

const MarketingConsentScreen = (props: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isMModal, setIsMModal] = useState(false);
  return (
    <TitleWithBackWhiteBgLayout title="Marketing Consent">
      <MarketingConsentModal isVisible={isMModal} setIsVisible={setIsMModal} />
      <View style={styles.container}>
        <Text style={styles.headerText}>
          BioMark would like to contact you regarding information on offers,
          promotions and services via email and SMS.
        </Text>
        <CheckBoxWithText
          rightText="I  would like to receive information on offers, promotions and services via email and SMS."
          isChecked={isChecked}
          setIsChecked={(value: any) => {
            if (!value) {
              setIsMModal(true);
            } else {
              setIsChecked(value);
            }
          }}
        />
        <View style={styles.bottomBtnContainer}>
          <ButtonComponent
                                                    onPress={() => {
                                                    } }
                                                    title={'Save'} disabled={false}          />
        </View>
      </View>
    </TitleWithBackWhiteBgLayout>
  );
};

export default MarketingConsentScreen;
