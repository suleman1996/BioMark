import { ModalWithBottomBtn, TagsCloudInput } from 'components/higher-order';
import GeneralRadioQuestions from 'components/higher-order/general-radio-question';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { addMedicalHistoryUpdate } from 'store/profile/profile-actions';
import { MedicalTemplateAttribute, MedicalTemplateField } from 'types/api';
import { logNow } from 'utils/functions/log-binder';

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
        ?.medication_list || [],
  };

  const TagsComponent = ({ item }: { item: MedicalTemplateField }) => {
    return (
      <TagsCloudInput
        question={item.question}
        data={medication_list}
        setData={async (value: any) => {
          logNow('redux', medicalHistory);
          let updatedItems = [];
          if (medicalHistory.length > 0) {
            updatedItems = medicalHistory?.map((el) =>
              el.condition_id === condition_id
                ? { ...el, medication_list: value ? [...value] : [] }
                : el
            );
          } else {
            updatedItems[0] = {
              condition_id: condition_id,
              medication_list: value ? value : [],
            };
          }
          await dispatch(addMedicalHistoryUpdate(updatedItems));
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
                medicalHistory.filter((el) => el.condition_id === condition_id)
                  .length > 0;
              if (d) {
                logNow('redux', value);
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
    }
  }

  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={name}
      onPress={() => console.log('clicked')}
    >
      {allTsxFields}
    </ModalWithBottomBtn>
  );
};

export default GeneralModalPage;
