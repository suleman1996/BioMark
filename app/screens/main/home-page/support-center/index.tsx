import React, { useState } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import Icon from '../../../../assets/svgs/empower';
import WaveIcon from '../../../../assets/svgs/wave';
import SupportSystemForm from 'components/support-system-form';
import SupportSystemForm2 from 'components/support-system-form2';
import CheckBox from 'components/checkbox';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import GradientButton from 'components/linear-gradient-button';

import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import { userService } from 'services/user-service/user-service';
// import { showMessage } from 'react-native-flash-message';

const SupportCenter = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [checked, setChecked] = useState(false);

  const termsCondition = async () => {
    try {
      await userService.Terms({
        module: {
          terms: checked,
        },
      });

      navigate(SCREENS.EMPOWER_PROGRAM);
    } catch (err) {
      console.error('Terms and condition error ', err.errMsg);
      // showMessage({
      //   message: err.errMsg.error,
      //   type: 'danger',
      // });
    }
  };

  return (
    <TitleWithBackWhiteBgLayout title={undefined}>
      <ScrollView>
        <Icon height={70} />
        <Text style={styles.text}>By signing this form, you hereby:</Text>

        <SupportSystemForm
          text={
            'You agree to participate in the EMPOWER Patient Program for Insulin Glargine/Lixisenatide (Soliqua) or Insulin Glargine U300 (Toujeo), and/or Irbesartan + Amlodipine (Aprovasc) (the “Program”). You confirm that you were informed of this Program, and agree to be enrolled therein, by your enrolling physician.'
          }
          text2={
            'By enrolling in the Program, you expressly give consent to third parties, and/or third party providers that sanofi-aventis Philippines Inc.("Sanofi") engages or contracts with (collectively, "Third Party/ies") that are involved in the Program to collect and process your personal information and to conduct the Program in accordance with the following purposes (“Purposes”):'
          }
        />
        <SupportSystemForm2
          text={
            '1. Provide you education on diabetes and/or hypertension management, product handling, titration etc., as may be applicable. Medical assessment and case processing in the event of adverse drug reaction or Pharmacovigilance events.'
          }
          text2={
            '2. Give you proper device training in terms of proper and correct usage of medical devices and/or the Insulin Glargine/Lixisenatide (Soliqua) or Insulin Glargine U300 (Toujeo) solostar pen.'
          }
          text3={
            '3. You may be provided with seven (7) pieces of Irbesartan/Amlodipine (Aprovasc) every three (3) months for a period of one (1) year. Sanofi reserves the right to suspend the provision of doses, depending on availability and other factors.'
          }
          text4={
            '4. Provide you with regular reminder on regular blood glucose monitoring, regular blood pressure monitoring, other necessary laboratory test your doctor will require.'
          }
          text5={
            '5. Provide your enrolling physician with regular report on your activities in the Program for proper information feedback and monitoring.'
          }
        />
        <SupportSystemForm
          text3={
            'You acknowledge that you are aware that the Program is not a clinical study and all data related to you will be accessible only to Third Party/ies involved in the Program, and all data will be handled with full confidentiality in compliance with the Data Privacy Act and all related issuances. Such data will be stored for a period of 10 years. '
          }
          text4={
            'You acknowledge that data collected by our Nurse Educator in the format of medical record/s (“Medical Record”) will be collected in a patient relationship management system (“PRM”) operated by My Blood Profile Technology Corp. (“BioMark”) or any other Third Party/ies retained by Sanofi for the purpose, accessible only by Nurse Educators (from Home Health Care Placements, Inc. (“HHCP”)), BioMark and Third Party/ies.For the avoidance of doubt, Sanofi shall have no access to individual patient records.'
          }
          text5={
            'You agree that your Medical Record will be shared by BioMark and Nurse Educators (from HHCP) to your enrolling physician.'
          }
          text6={
            'You acknowledge that aggregated reports from the Program will be generated and accessible to Sanofi and Third Party/ies for purposes of assessing the Programs effectiveness to support in diabetes and/or hypertension management, and in evaluating  the Programs potential for further improvements. You likewise agree that your personal data will be provided to Third Party/ies for the purpose of anonymizing the same before any further processing will be done, which processing includes the generation of aggregated data. You acknowledge that aggregated data from the Program may be used for publication purposes by Sanofi or Third Party/ies, such as, but not limited to, scientific papers, other written reports, etc. Aggregated reports that are anonymized consist of data provided in this form and those collected in the Program’s digital platforms (such as the Biomark Application). You understand that the strictest level of confidentiality and security will be maintained at any stage of the processing of your personal data.'
          }
          text7={
            'You acknowledge that you have the right to access and correct your personal information at any time upon your request by downloading and updating the BioMark Application or by contacting 0919-433-3392 (Smart).'
          }
          text8={
            'You acknowledge that the planned education session with Nurse Educators is good for one (1) year. Beyond this one-year period, the patient can avail of the BioMark application and call center, as long as the EMPOWER program is still active. '
          }
          text9={
            'You acknowledge that you can withdraw from the Program at any time without prejudice by sending your message through the Biomark App or by contacting 0919-433-3392 (Smart). You agree that personal data already collected from you will remain in the specific Program database for the retention period mentioned above, unless you request also for these data to be deleted.'
          }
          text10={
            'You acknowledge that you are aware that this Program may be discontinued at any given time and that you will be notified thirty (30) days prior the discontinuation date.'
          }
        />
        <View style={styles.checkboxView}>
          <CheckBox checked={checked} setChecked={setChecked} />
          <Text style={styles.checkboXText}>
            I hereby confirm my understanding of the above policy and my consent
            to the collection, use and disclosure of my information in
            accordance to the terms of the policy.
          </Text>
        </View>
        {checked ? (
          <View style={styles.gradientButtonView}>
            <GradientButton
              text="Accept & Continue"
              color={['#2C6CFC', '#2CBDFC']}
              disabled={!checked ? true : false}
              onPress={() => termsCondition()}
              // onPress={() => navigate(SCREENS.EMPOWER_PROGRAM)}
            />
          </View>
        ) : (
          <View style={styles.gradientButtonView}>
            <GradientButton
              text="Accept & Continue"
              color={['#cccccc', '#cccccc']}
              disabled={!checked ? true : false}
            />
          </View>
        )}
        <WaveIcon style={{ height: 100, width: '100%' }} />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};
export default SupportCenter;
