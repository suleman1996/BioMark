/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import SCREENS from 'navigation/constants';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import DatePicker from 'components/date-picker/index';
import GradientButton from 'components/linear-gradient-button';
import { DropdownMenu, InputWithLabel } from 'components/base';

import { userService } from 'services/user-service/user-service';
import { navigate } from 'services/nav-ref';

import makeStyles from './styles';
import { AccountDeActivateModal } from 'components/ui';

const FREQUENCY_TIME_OPTIONS: any[] = [
  { label: '12AM', value: '12AM' },
  { label: '1AM', value: '1AM' },
  { label: '2AM', value: '2AM' },
  { label: '3AM', value: '3AM' },
  { label: '4AM', value: '4AM' },
  { label: '5AM', value: '5AM' },
  { label: '6AM', value: '6AM' },
  { label: '7AM', value: '7AM' },
  { label: '8AM', value: '8AM' },
  { label: '9AM', value: '9AM' },
  { label: '10AM', value: '10AM' },
  { label: '11AM', value: '11AM' },
  { label: '12PM', value: '12PM' },
  { label: '1PM', value: '1PM' },
  { label: '2PM', value: '2PM' },
  { label: '3PM', value: '3PM' },
  { label: '4PM', value: '4PM' },
  { label: '5PM', value: '5PM' },
  { label: '6PM', value: '6PM' },
  { label: '7PM', value: '7PM' },
  { label: '8PM', value: '8PM' },
  { label: '9PM', value: '9PM' },
  { label: '10PM', value: '10PM' },
  { label: '11PM', value: '11PM' },
];

type MEDICATION_TYPE = {
  disease_type: number;
  medication_list_id: number;
  unit_list_id: number;
  dosage: number;
  frequency: number | null;
  frequency_time: string[];
  start_date: any;
  end_date: any;
};

const MedicationForm = (props: any) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // Form Options
  const [medicationOptionsData, setMedicationOptionsData] = useState<any>({
    medication_list: [],
    unit_list: [],
    frequency_list: [],
  });

  const [medication, setMedication] = useState<MEDICATION_TYPE>({
    disease_type: 0,
    medication_list_id: 0,
    unit_list_id: 12,
    dosage: 0,
    frequency: null,
    frequency_time: [],
    start_date: new Date(),
    end_date: new Date(),
  });
  const [dosageRangeError, setDosageRangeError] = useState<string>('');
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const medicationIndex = medicationOptionsData.medication_list.findIndex(
    ({ id }) => id === medication.medication_list_id
  );

  const SHOW_DISEASE_LIST =
    medicationOptionsData.medication_list[medicationIndex]?.disease_list
      ?.length > 0;
  const DOSAGE_RANGE = {
    MAX: Number(
      medicationOptionsData.medication_list[medicationIndex]?.max_range || null
    ),
    MIN: Number(
      medicationOptionsData.medication_list[medicationIndex]?.min_range || null
    ),
  };
  const SELECTED_MEDICATION_ID = props?.route?.params?.medication_record_id;
  const SHOW_DOSAGE_INPUT =
    (DOSAGE_RANGE.MAX > 1 ||
      DOSAGE_RANGE.MAX === 0 ||
      SELECTED_MEDICATION_ID) &&
    medication.dosage !== '1.0';
  const BUTTON_DISABLED =
    (SHOW_DISEASE_LIST ? medication.disease_type : true) &&
    medication.medication_list_id &&
    medication.unit_list_id &&
    (DOSAGE_RANGE.MAX > 1 ? medication.dosage : 1) &&
    medication.frequency &&
    medication.frequency_time.length > 0;

  useLayoutEffect(() => {
    if (SELECTED_MEDICATION_ID) {
      getSelectedMedicationData();
    } else {
      getMedicationForm();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (DOSAGE_RANGE.MAX === 1) {
      setMedication({
        ...medication,
        frequency: 1,
        disease_type: 3,
        dosage: 1,
      });
    } else if (!SELECTED_MEDICATION_ID) {
      setMedication({
        ...medication,
        frequency: null,
        disease_type: 0,
        dosage: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medication.medication_list_id]);

  useEffect(() => {
    const tempFrequencyTime: string[] =
      medicationOptionsData.frequency_list.find(
        (obj) => obj.id === medication.frequency
      )?.frequency_time || [];
    const temp = {
      ...medication,
      frequency_time: [...tempFrequencyTime],
    };
    setMedication({ ...temp });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medication.frequency]);

  const updateMedication = (key: string, val: any) => {
    setMedication((prevMedication) => ({ ...prevMedication, [key]: val }));
  };

  // GET Show Medication Data
  const getMedicationForm = async () => {
    try {
      const medData = await userService.getNewMedicationFormData();
      setMedicationOptionsData({
        ...medData,
      });
    } catch (err) {
      console.error(err);
    }
  };

  //ShowMedication API
  const getSelectedMedicationData = async () => {
    try {
      await getMedicationForm();
      const medData = await userService.getSelectedMedicationData(
        SELECTED_MEDICATION_ID
      );
      setMedication({
        ...medData,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Save & Update Medication
  const saveMedication = async () => {
    const API_FUNCTION = SELECTED_MEDICATION_ID
      ? 'updateMedication'
      : 'saveMedication';
    try {
      await userService[API_FUNCTION]({ medication }, SELECTED_MEDICATION_ID);
      navigate(SCREENS.SHOW_MEDICATION);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Medication
  const deleteMedication = async () => {
    try {
      await userService.deleteMedication(SELECTED_MEDICATION_ID);
      navigate(SCREENS.SHOW_MEDICATION);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView>
        <TitleWithBackWhiteBgLayout
          binIcon={SELECTED_MEDICATION_ID ? true : false}
          onPressIcon={() => setShowDeleteModal(true)}
          title={
            SELECTED_MEDICATION_ID ? 'Edit Medication' : 'Add New Medication'
          }
        >
          <View style={styles.container}>
            {SELECTED_MEDICATION_ID ? (
              <>
                <Text style={styles.textStyle}>{medication?.name}</Text>
              </>
            ) : (
              <View style={styles.dropDownMenu}>
                <DropdownMenu
                  label="Medication"
                  options={medicationOptionsData.medication_list}
                  selectedValue={medication.medication_list_id}
                  onValueChange={(text: any) => {
                    updateMedication('medication_list_id', text);
                  }}
                />
              </View>
            )}

            {!SELECTED_MEDICATION_ID && SHOW_DISEASE_LIST && (
              <View>
                <DropdownMenu
                  label="Disease"
                  options={
                    medicationOptionsData.medication_list[
                      0 || medication.medication_list_id
                    ]?.disease_list || []
                  }
                  selectedValue={medication?.disease_type}
                  onValueChange={(text: any) =>
                    updateMedication('disease_type', text)
                  }
                />
              </View>
            )}
            <View>
              <Text style={styles.textStyle}>Dosage</Text>
              {SHOW_DOSAGE_INPUT ? (
                <View style={styles.dosageView}>
                  <View
                    style={{
                      width: '78%',
                    }}
                  >
                    <InputWithLabel
                      value={medication.dosage}
                      error={dosageRangeError}
                      onChange={(val) => {
                        const err =
                          Number(val) > DOSAGE_RANGE.MAX ||
                          Number(val) < DOSAGE_RANGE.MIN
                            ? `Please input valid numbers between ${DOSAGE_RANGE.MIN} and ${DOSAGE_RANGE.MAX}.`
                            : '';

                        updateMedication('dosage', val);
                        setDosageRangeError(err);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '20%',
                    }}
                  >
                    <Text style={styles.unitText}>unit(s)</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.subText}>1 pill(s)</Text>
              )}
            </View>
            <View style={styles.dropDownMenu}>
              <Text style={styles.textStyle}>Frequency of Dosage</Text>
              {DOSAGE_RANGE.MAX > 1 || DOSAGE_RANGE.MAX === 0 ? (
                <View style={styles.dropDownMenu}>
                  <DropdownMenu
                    options={medicationOptionsData.frequency_list}
                    selectedValue={medication.frequency}
                    onValueChange={(text: any) =>
                      updateMedication('frequency', text)
                    }
                  />
                </View>
              ) : (
                <Text style={styles.subText}>1x a day</Text>
              )}

              {medication.frequency &&
                medication.frequency_time.map((time, index) => (
                  <View style={styles.dropDownMenu} key={index}>
                    <DropdownMenu
                      options={[...FREQUENCY_TIME_OPTIONS]}
                      selectedValue={medication.frequency_time[index]}
                      onValueChange={(text: any) => {
                        let tempMedFrequency = [...medication.frequency_time];
                        tempMedFrequency[index] = text;
                        updateMedication('frequency_time', [
                          ...tempMedFrequency,
                        ]);
                      }}
                    />
                  </View>
                ))}
            </View>

            <View>
              <DatePicker
                label="Start Date"
                isPickerShow={isPickerShow}
                setIsPickerShow={setIsPickerShow}
                date={medication.start_date}
                setDate={(newDate: any) =>
                  updateMedication('start_date', newDate)
                }
                width={'100%'}
              />
            </View>
            <View>
              <DatePicker
                label="End Date"
                isPickerShow={isPickerShow}
                setIsPickerShow={setIsPickerShow}
                date={medication.end_date}
                setDate={(newDate: any) =>
                  updateMedication('end_date', newDate)
                }
                width={'100%'}
              />
            </View>
          </View>
          {showDeleteModal && (
            <AccountDeActivateModal
              headerText="Medication"
              subHeading="Are you sure you wish to delete this medication?"
              buttonUpperText="Yes"
              buttonLowerText="Skip"
              isVisible={showDeleteModal}
              setIsVisible={setShowDeleteModal}
              callMe={deleteMedication}
            />
          )}
        </TitleWithBackWhiteBgLayout>
      </ScrollView>
      {SELECTED_MEDICATION_ID ? (
        <GradientButton
          text="Save Edit"
          color={['#2C6CFC', '#2CBDFC']}
          disabled={!BUTTON_DISABLED}
          style={styles.gradientButton}
          onPress={saveMedication}
        />
      ) : (
        <GradientButton
          text="Add"
          color={
            BUTTON_DISABLED
              ? ['#2C6CFC', '#2CBDFC']
              : [colors.disabled, colors.disabled]
          }
          disabled={!BUTTON_DISABLED}
          style={styles.gradientButton}
          onPress={saveMedication}
        />
      )}
    </View>
  );
};

export default MedicationForm;
