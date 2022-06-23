import { InputWithLabel } from 'components/base';
import DropdownMenuWithQuestion from 'components/base/dropdown-menu-with-question';
import { ModalWithBottomBtn, TagsCloudInput } from 'components/higher-order';
import GeneralRadioQuestions from 'components/higher-order/general-radio-question';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from 'store/IAppState';
import { addMedicalHistoryUpdate } from 'store/profile/profile-actions';
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
  const medicalHistory = useSelector(
    (state: IAppState) => state.profile?.medicalHistoryUpdate
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
      medicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.has_condition || false,
    taking_medication:
      medicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.taking_medication || false,
    medication_list:
      medicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medication_list?.length > 1
        ? medicalHistory
            ?.find((item: any) => item.condition_id == qData?.id)
            ?.medication_list?.toString()
            ?.split(',')
        : '' || [],
    diabetes_type:
      medicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medical_values?.diabetes_type || '',
    selectedOption:
      medicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medical_values?.options || '',
    otherOptions:
      medicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medical_values?.otherOptions || '',
    treatmentType:
      medicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medical_values?.treatmentType || '',
    // treatmentTypeOther:
    //   medicalHistory?.find((item: any) => item.condition_id == qData?.id)
    //     ?.medical_values?.treatmentTypeOther || '',
    treatment:
      medicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.medical_values?.treatment || false,
    other_condition:
      medicalHistory?.find((item: any) => item.condition_id == qData?.id)
        ?.other_condition?.length > 1
        ? medicalHistory
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
          // logNow('redux', medicalHistory);

          let updatedItems = [];
          if (medicalHistory.length > 0) {
            updatedItems = medicalHistory?.map((el) =>
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
          dispatch(addMedicalHistoryUpdate(updatedItems));
          // logNow('redux', updatedItems);
        }}
      />
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
            // logNow('redux', medicalHistory);
            let updatedItems = [];
            if (medicalHistory.length > 0) {
              updatedItems = medicalHistory?.map((el) =>
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
            dispatch(addMedicalHistoryUpdate(updatedItems));
            // logNow('redux', updatedItems);
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
                await dispatch(addMedicalHistoryUpdate(updatedItems));
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
          // logNow('redux', medicalHistory);
          let updatedItems = [];
          if (medicalHistory.length > 0) {
            updatedItems = medicalHistory?.map((el) =>
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
          dispatch(addMedicalHistoryUpdate(updatedItems));
          // logNow('redux', updatedItems);
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
          const d = medicalHistory.find(
            (el) => el.condition_id === condition_id
          );
          if (d) {
            updatedItems = medicalHistory?.map((el) =>
              el.condition_id === condition_id
                ? {
                    ...el,
                    other_condition: value ? value.toString() : [],
                    has_condition:
                      value.length <= 0 && medication_list.length <= 0
                        ? false
                        : true,
                  }
                : el
            );
            // logNow('1');
          } else {
            updatedItems.push({
              condition_id: condition_id,
              has_condition: true,
              medical_type: 'personal',
              other_condition: value ? value.toString() : [],
            });
            // logNow('2', updatedItems);
          }
          dispatch(addMedicalHistoryUpdate(updatedItems));
          // logNow('redux', updatedItems);
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
          const d = medicalHistory.find(
            (el) => el.condition_id === condition_id
          );
          if (d) {
            updatedItems = medicalHistory?.map((el) =>
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
            // logNow('1');
          } else {
            updatedItems.push({
              condition_id: condition_id,
              has_condition: true,
              medical_type: 'personal',
              medication_list: value ? value.toString() : [],
            });
            // logNow('2', updatedItems);
          }

          await dispatch(addMedicalHistoryUpdate(updatedItems));

          // logNow('redux', updatedItems);
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
                medicalHistory.filter((el) => el.condition_id === condition_id)
                  .length > 0;
              if (d) {
                updatedItems = medicalHistory?.map((el) =>
                  el.condition_id === condition_id
                    ? { ...el, has_condition: value == 'Yes' ? true : false }
                    : el
                );
              } else {
                updatedItems = [
                  ...medicalHistory,
                  {
                    condition_id: condition_id,
                    has_condition: value,
                    medical_type: 'personal',
                  },
                ];
              }
              await dispatch(addMedicalHistoryUpdate(updatedItems));
              logNow('redux', updatedItems);
            }}
          />
        ) : item?.id == 'takingMedication' ? (
          <GeneralRadioQuestions
            question={item.question}
            options={item.options}
            isTrue={taking_medication ? 'Yes' : 'No'}
            setIsTrue={async (value: any) => {
              logNow('redux', medicalHistory);
              let updatedItems = [];
              if (medicalHistory.length > 0) {
                updatedItems = medicalHistory?.map((el) =>
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
              await dispatch(addMedicalHistoryUpdate(updatedItems));
              logNow('redux', updatedItems);
            }}
          />
        ) : item?.id == 'statusTreatment' && has_condition ? (
          <GeneralRadioQuestions
            question={item.question}
            options={item.options}
            isTrue={treatment ? 'Yes' : 'No'}
            setIsTrue={async (value: any) => {
              logNow('redux', medicalHistory);
              let updatedItems = [];
              if (medicalHistory.length > 0) {
                updatedItems = medicalHistory?.map((el) =>
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
              await dispatch(addMedicalHistoryUpdate(updatedItems));
              logNow('redux', updatedItems);
            }}
          />
        ) : item?.id == 'treatmentType' ? (
          <GeneralRadioQuestions
            question={item.question}
            options={item.options}
            isTrue={treatment ? 'Yes' : 'No'}
            setIsTrue={async (value: any) => {
              logNow('redux', medicalHistory);
              let updatedItems = [];
              if (medicalHistory.length > 0) {
                updatedItems = medicalHistory?.map((el) =>
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
              await dispatch(addMedicalHistoryUpdate(updatedItems));
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
      item.id === 'statusMedication' &&
      taking_medication
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
      allTsxFields.push(
        <DropDownOther
          item={item}
          condition_id={condition_id}
          dispatch={dispatch}
          medicalHistory={medicalHistory}
          otherOptions={otherOptions}
          selectedOption={selectedOption}
        />
      );
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
        setIsVisible();
      }}
    >
      {allTsxFields}
    </ModalWithBottomBtn>
  );
};

const DropDownOther = ({
  item,
  selectedOption,
  dispatch,
  medicalHistory,
  otherOptions,
  condition_id,
}: {
  item: MedicalTemplateField;
  selectedOption: any;
  dispatch: Dispatch;
  medicalHistory: any;
  otherOptions: any;
  condition_id: any;
}) => {
  return (
    <>
      <DropdownMenuWithQuestion
        options={item.options}
        question={item.question}
        selectedValue={selectedOption}
        onValueChange={async (value: any) => {
          // logNow('redux', medicalHistory);
          let updatedItems = [];
          if (medicalHistory.length > 0) {
            updatedItems = medicalHistory?.map((el) =>
              el.condition_id === condition_id
                ? { ...el, medical_values: { options: value } }
                : el
            );
          } else {
            updatedItems.push({
              condition_id: condition_id,
              has_condition: true,
              medical_type: 'personal',
              medical_values: { options: value },
            });
          }
          await dispatch(addMedicalHistoryUpdate(updatedItems));
          // logNow('redux', updatedItems);
        }}
      />
      {selectedOption == 'Other' ? (
        <View
          style={{
            paddingHorizontal: widthToDp(6.4),
            marginTop: heightToDp(1),
          }}
        >
          <InputWithLabel
            labelFontSize={25}
            // label={''}
            defaultValue={otherOptions}
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
              await dispatch(addMedicalHistoryUpdate(updatedItems));
              // logNow('redux', updatedItems);
            }}
          />
        </View>
      ) : null}
    </>
  );
};

export default GeneralModalPage;
