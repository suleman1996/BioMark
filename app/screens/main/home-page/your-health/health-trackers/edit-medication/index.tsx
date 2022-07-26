import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import GradientButton from 'components/linear-gradient-button';

import { userService } from 'services/user-service/user-service';
import SCREENS from 'navigation/constants';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';

const EditMedication = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();

  // Medications List from API
  const [medicationList, setMedicationList] = useState<any[]>([]);
  const [selectedMedication, setSelectedMedication] = useState(false);

  // Component Did Mount
  useEffect(() => {
    getMedicationsList();
  }, []);

  // Get Medications List from API Call
  const getMedicationsList = async () => {
    try {
      const medicinesList: any = await userService.getMedicationList();
      setMedicationList([...medicinesList]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TitleWithBackWhiteBgLayout
      title={t('pages.medicationInput.titleEdit')}
      style={{ flex: 1 }}
      binIcon={false}
    >
      <View style={styles.container}>
        <View style={{ height: '100%' }}>
          <RadioButton.Group
            value={selectedMedication}
            onValueChange={(newValue) => setSelectedMedication(newValue)}
          >
            {medicationList?.map(({ medication_record_id, name }) => (
              <TouchableOpacity
                onPress={() => setSelectedMedication(medication_record_id)}
                style={{
                  marginBottom: 10,
                  borderRadius: 5,
                  backgroundColor:
                    selectedMedication == medication_record_id
                      ? colors.shineBlue
                      : colors.inputBg,
                }}
              >
                <View style={styles.checklistView}>
                  <RadioButton
                    value={medication_record_id}
                    color={colors.white}
                  />
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color:
                          selectedMedication == medication_record_id
                            ? colors.white
                            : colors.smoke,
                      },
                    ]}
                  >
                    {name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </RadioButton.Group>
        </View>
      </View>
      <GradientButton
        text={t('pages.medicationList.continue')}
        disabled={!selectedMedication}
        color={['#2C6CFC', '#2CBDFC']}
        onPress={() =>
          navigation.navigate(SCREENS.ADD_NEW_MEDICATION, {
            medication_record_id: selectedMedication,
          })
        }
        style={styles.gradientButton}
      />
    </TitleWithBackWhiteBgLayout>
  );
};

export default EditMedication;
