import { InputWithLabel } from 'components/base';
import DropdownMenuWithQuestion from 'components/base/dropdown-menu-with-question';
import { ModalWithBottomBtn, TagsCloudInput } from 'components/higher-order';
import GeneralRadioQuestions from 'components/higher-order/general-radio-question';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { addFamilyMedicalHistoryUpdate } from 'store/profile/profile-actions';
import { MedicalTemplateAttribute, MedicalTemplateField } from 'types/api';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
  qData: MedicalTemplateAttribute;
};

const GeneralModalPage = ({ isVisible, setIsVisible, qData }: Props) => {
  const dispatch = useDispatch();
  const familyMedicalHistory = useSelector(
    (state: IAppState) => state.profile?.familyMedicalHistoryUpdate
  );
  // user profile data
  const userProfileDataFromRedux = useSelector(
    (state: IAppState) => state.profile?.userProfile
  );

  const { name = '', fields = [] } = {
    name: qData.name,
    fields: qData?.content?.fields,
  };

  var {
    // id = '',
    condition_id = '',
    // medical_type = '',
    has_condition = false,
    taking_medication = false,
    medication_list = [],
    diabetes_type = '',
    selectedOption = '',
    otherOptions = '',
    treatmentType = '',
    // treatmentTypeOther = '',
    treatment = '',
    other_condition = '',
    gender_id = 1,
  } = {
    // id: qData?.id,
    condition_id: qData?.id,
    // medical_type: qData?.medical_type,
    has_condition:
      familyMedicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.has_condition || false,
    taking_medication:
      familyMedicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.taking_medication || false,
    medication_list:
      familyMedicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medication_list?.length > 1
        ? familyMedicalHistory
            ?.find((item: any) => item.condition_id == qData?.id)
            ?.medication_list?.toString()
            ?.split(',')
        : '' || [],
    diabetes_type:
      familyMedicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medical_values?.diabetes_type || '',
    selectedOption:
      familyMedicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medical_values?.options || '',
    otherOptions:
      familyMedicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medical_values?.otherOptions || '',
    treatmentType:
      familyMedicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medical_values?.treatmentType || '',
    // treatmentTypeOther:
    //   familyMedicalHistory?.find((item: any) => item.condition_id == qData?.id)
    //     ?.medical_values?.treatmentTypeOther || '',
    treatment:
      familyMedicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medical_values?.treatment || false,
    other_condition:
      familyMedicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.other_condition?.length > 1
        ? familyMedicalHistory
            ?.find((item: any) => item.condition_id == qData?.id)
            ?.other_condition?.toString()
            ?.split(',')
        : '' || [],
    gender_id: userProfileDataFromRedux?.gender_id,
  };

  const DropDown = ({ item }: { item: MedicalTemplateField }) => {
    return (
      <DropdownMenuWithQuestion
        options={item.options}
        question={item.question}
        selectedValue={diabetes_type}
        onValueChange={async (value: any) => {
          logNow('redux', familyMedicalHistory);
          let updatedItems = [];
          if (familyMedicalHistory.length > 0) {
            updatedItems = familyMedicalHistory?.map((el) =>
              el.condition_id === condition_id
                ? { ...el, medical_values: { diabetes_type: value } }
                : el
            );
          } else {
            updatedItems[0] = {
              condition_id: condition_id,
              medical_values: { diabetes_type: value },
            };
          }
          await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
          logNow('redux', updatedItems);
        }}
      />
    );
  };

  const DropDownOther = ({ item }: { item: MedicalTemplateField }) => {
    return (
      <>
        <DropdownMenuWithQuestion
          options={item.options}
          question={item.question}
          selectedValue={selectedOption}
          onValueChange={async (value: any) => {
            // logNow('redux', familyMedicalHistory);
            let updatedItems = [];
            if (familyMedicalHistory.length > 0) {
              updatedItems = familyMedicalHistory?.map((el) =>
                el.condition_id === condition_id
                  ? { ...el, medical_values: { options: value } }
                  : el
              );
            } else {
              updatedItems.push({
                condition_id: condition_id,
                has_condition: true,
                medical_type: 'family',
                medical_values: { options: value },
              });
            }
            await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
            logNow('redux', updatedItems);
          }}
        />
        {selectedOption == 'Other' ? (
          <View
            style={{
              paddingHorizontal: widthToDp(4),
              marginTop: -heightToDp(2),
            }}
          >
            <InputWithLabel
              labelFontSize={25}
              label={''}
              defaultValue={otherOptions}
              onChange={async (value: any) => {
                logNow('redux', value);
                let updatedItems = [];
                if (familyMedicalHistory.length > 0) {
                  updatedItems = familyMedicalHistory?.map((el) =>
                    el.condition_id === condition_id
                      ? {
                          ...el,
                          medical_values: {
                            ...el.medical_values,
                            otherOptions: value,
                          },
                        }
                      : el
                  );
                } else {
                  updatedItems[0] = {
                    condition_id: condition_id,
                    medical_values: { otherOptions: value },
                  };
                }
                await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
                logNow('redux', updatedItems);
              }}
            />
          </View>
        ) : null}
      </>
    );
  };

  const TreatmentTypeDropDown = ({ item }: { item: MedicalTemplateField }) => {
    return (
      <>
        <DropdownMenuWithQuestion
          options={item.options}
          question={item.question}
          selectedValue={treatmentType}
          onValueChange={async (value: any) => {
            logNow('redux', familyMedicalHistory);
            let updatedItems = [];
            if (familyMedicalHistory.length > 0) {
              updatedItems = familyMedicalHistory?.map((el) =>
                el.condition_id === condition_id
                  ? {
                      ...el,
                      medical_values: {
                        ...el.medical_values,
                        treatmentType: value,
                      },
                    }
                  : el
              );
            } else {
              updatedItems[0] = {
                condition_id: condition_id,
                medical_values: { treatmentType: value },
              };
            }
            await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
            logNow('redux', updatedItems);
          }}
        />
        {/* {treatmentType == 'Other' ? (
          <View
            style={{
              paddingHorizontal: widthToDp(4),
              marginTop: -heightToDp(2),
            }}
          >
            <InputWithLabel
              labelFontSize={25}
              label={''}
              defaultValue={treatmentTypeOther}
              onChange={async (value: any) => {
                logNow('redux', value);
                let updatedItems = [];
                if (medicalHistory.length > 0) {
                  updatedItems = medicalHistory?.map((el) =>
                    el.condition_id === condition_id
                      ? {
                          ...el,
                          medical_values: {
                            ...el.medical_values,
                            treatmentTypeOther: value,
                          },
                        }
                      : el
                  );
                } else {
                  updatedItems[0] = {
                    condition_id: condition_id,
                    medical_values: { treatmentTypeOther: value },
                  };
                }
                await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
                logNow('redux', updatedItems);
              }}
            />
          </View>
        ) : null} */}
      </>
    );
  };

  const TagsComponent = ({ item }: { item: MedicalTemplateField }) => {
    return (
      <TagsCloudInput
        question={item.question}
        data={medication_list}
        setData={async (value: any) => {
          logNow('redux', familyMedicalHistory);
          let updatedItems = [];
          if (familyMedicalHistory.length > 0) {
            updatedItems = familyMedicalHistory?.map((el) =>
              el.condition_id === condition_id
                ? { ...el, medication_list: value ? value.toString() : [] }
                : el
            );
          } else {
            updatedItems[0] = {
              condition_id: condition_id,
              medication_list: value ? value.toString() : [],
            };
          }
          await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
          logNow('redux', updatedItems);
        }}
      />
    );
  };

  const OtherConditionTagsComponent = ({
    item,
  }: {
    item: MedicalTemplateField;
  }) => {
    return (
      <TagsCloudInput
        question={item.question}
        data={other_condition}
        setData={async (value: any) => {
          let updatedItems = [];
          const d = familyMedicalHistory.find(
            (el) => el.condition_id === condition_id
          );
          if (d) {
            updatedItems = familyMedicalHistory?.map((el) =>
              el.condition_id === condition_id
                ? {
                    ...el,
                    other_condition: value ? value.toString() : [],
                    medical_type: 'family',
                    has_condition:
                      value.length <= 0 && medication_list.length <= 0
                        ? false
                        : true,
                  }
                : el
            );
            logNow('1');
          } else {
            updatedItems.push({
              condition_id: condition_id,
              has_condition: true,
              medical_type: 'family',
              other_condition: value ? value.toString() : [],
            });
            logNow('2', updatedItems);
          }
          await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
          logNow('redux', updatedItems);
        }}
      />
    );
  };

  const OtherMedicationsTagsComponent = ({
    item,
  }: {
    item: MedicalTemplateField;
  }) => {
    return (
      <TagsCloudInput
        question={item.question}
        data={medication_list}
        setData={async (value: any) => {
          let updatedItems = [];
          const d = familyMedicalHistory.find(
            (el) => el.condition_id === condition_id
          );
          if (d) {
            console.log('value', value);
            updatedItems = familyMedicalHistory?.map((el) =>
              el.condition_id === condition_id
                ? {
                    ...el,
                    medication_list: value ? value.toString() : [],
                    has_condition:
                      value.length <= 0 && other_condition.length <= 0
                        ? false
                        : true,
                  }
                : el
            );
            logNow('1');
          } else {
            updatedItems.push({
              condition_id: condition_id,
              has_condition: true,
              medical_type: 'family',
              medication_list: value ? value.toString() : [],
            });
            logNow('2', updatedItems);
          }

          await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));

          logNow('redux', updatedItems);
        }}
      />
    );
  };

  const RadioBtn = ({ item }: { item: MedicalTemplateField }) => {
    return (
      <>
        {item?.id == 'status' ? (
          <GeneralRadioQuestions
            question={item.question}
            options={item.options}
            isTrue={has_condition ? 'Yes' : 'No'}
            setIsTrue={async (value: any) => {
              let updatedItems = [];
              const d =
                familyMedicalHistory.filter(
                  (el) => el.condition_id === condition_id
                ).length > 0;
              if (d) {
                logNow('redux', value);
                updatedItems = familyMedicalHistory?.map((el) =>
                  el.condition_id === condition_id
                    ? { ...el, has_condition: value == 'Yes' ? true : false }
                    : el
                );
              } else {
                updatedItems = [
                  ...familyMedicalHistory,
                  {
                    condition_id: condition_id,
                    has_condition: value,
                    medical_type: 'family',
                  },
                ];
              }
              await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
              logNow('redux', updatedItems);
            }}
          />
        ) : item?.id == 'takingMedication' ? (
          <GeneralRadioQuestions
            question={item.question}
            options={item.options}
            isTrue={taking_medication ? 'Yes' : 'No'}
            setIsTrue={async (value: any) => {
              logNow('redux', familyMedicalHistory);
              let updatedItems = [];
              if (familyMedicalHistory.length > 0) {
                updatedItems = familyMedicalHistory?.map((el) =>
                  el.condition_id === condition_id
                    ? {
                        ...el,
                        taking_medication: value == 'Yes' ? true : false,
                      }
                    : el
                );
              } else {
                updatedItems[0] = {
                  condition_id: condition_id,
                  taking_medication: value,
                };
              }
              await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
              logNow('redux', updatedItems);
            }}
          />
        ) : item?.id == 'statusTreatment' ? (
          <GeneralRadioQuestions
            question={item.question}
            options={item.options}
            isTrue={treatment ? 'Yes' : 'No'}
            setIsTrue={async (value: any) => {
              logNow('redux', familyMedicalHistory);
              let updatedItems = [];
              if (familyMedicalHistory.length > 0) {
                updatedItems = familyMedicalHistory?.map((el) =>
                  el.condition_id === condition_id
                    ? {
                        ...el,
                        medical_values: {
                          ...el.medical_values,
                          treatment: value == 'Yes' ? true : false,
                        },
                      }
                    : el
                );
              } else {
                updatedItems.push({
                  condition_id: condition_id,
                  medical_values: { treatment: value == 'Yes' ? true : false },
                });
              }
              await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
              logNow('redux', updatedItems);
            }}
          />
        ) : item?.id == 'treatmentType' ? (
          <GeneralRadioQuestions
            question={item.question}
            options={item.options}
            isTrue={treatment ? 'Yes' : 'No'}
            setIsTrue={async (value: any) => {
              logNow('redux', familyMedicalHistory);
              let updatedItems = [];
              if (familyMedicalHistory.length > 0) {
                updatedItems = familyMedicalHistory?.map((el) =>
                  el.condition_id === condition_id
                    ? {
                        ...el,
                        medical_values: {
                          ...el.medical_values,
                          treatment: value,
                        },
                      }
                    : el
                );
              } else {
                updatedItems[0] = {
                  condition_id: condition_id,
                  medical_values: { treatment: value },
                };
              }
              await dispatch(addFamilyMedicalHistoryUpdate(updatedItems));
              logNow('redux', updatedItems);
            }}
          />
        ) : null}
      </>
    );
  };

  var allTsxFields = [];

  for (let item of fields) {
    if ((item.type === 'radio' && has_condition) || item.id === 'status') {
      allTsxFields.push(<RadioBtn item={item} />);
    } else if (
      item.type === 'multi_text' &&
      has_condition &&
      item.id === 'statusMedication'
    ) {
      allTsxFields.push(<TagsComponent item={item} />);
    } else if (
      item.id === 'diabetesTypeFemale' &&
      gender_id == 2 &&
      has_condition
    ) {
      allTsxFields.push(<DropDown item={item} />);
    } else if (
      item.id === 'diabetesTypeMale' &&
      gender_id == 1 &&
      has_condition
    ) {
      allTsxFields.push(<DropDown item={item} />);
    } else if (
      item.id === 'takingMedication' &&
      gender_id == 1 &&
      has_condition
    ) {
      allTsxFields.push(<DropDown item={item} />);
    } else if (item.id === 'dropdownList' && has_condition) {
      allTsxFields.push(<DropDownOther item={item} />);
    } else if (item.type === 'radio' && has_condition) {
      allTsxFields.push(<RadioBtn item={item} />);
    } else if (
      item.type === 'dropdown' &&
      item.id === 'treatmentType' &&
      has_condition &&
      treatment === true
    ) {
      allTsxFields.push(<TreatmentTypeDropDown item={item} />);
    } else if (item.type === 'multi_text' && item.id === 'conditions') {
      allTsxFields.push(<OtherConditionTagsComponent item={item} />);
    } else if (item.type === 'multi_text' && item.id === 'medications') {
      allTsxFields.push(<OtherMedicationsTagsComponent item={item} />);
    } else if (
      (item.type === 'radio' && has_condition) ||
      item.id === 'statusTreatment'
    ) {
      allTsxFields.push(<RadioBtn item={item} />);
    }
  }

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={name}
      onPress={() => {
        console.log('clicked');
        setIsVisible();
      }}
    >
      {allTsxFields}
    </ModalWithBottomBtn>
  );
};

export default GeneralModalPage;
