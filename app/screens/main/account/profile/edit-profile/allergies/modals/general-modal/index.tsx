import { ModalWithBottomBtn, TagsCloudInput } from 'components/higher-order';
import GeneralRadioQuestions from 'components/higher-order/general-radio-question';
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { addAllergiesConditionsUpdate } from 'store/profile/profile-actions';
import { logNow } from 'utils/functions/log-binder';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
  qData: string;
};

const GeneralModalPage = ({ isVisible, setIsVisible, qData }: Props) => {
  const { colors }: any = useTheme();
  const dispatch = useDispatch();
  const allergiesMedicalHistory = useSelector(
    (state: IAppState) =>
      state.profile?.allergiesMedicalHistoryUpdate?.conditions
  );
  // user profile data

  const { name = '' } = {
    name: qData.name,
    fields: qData?.content?.fields,
  };

  var { has_condition = false, medication_list = [] } = {
    has_condition:
      allergiesMedicalHistory?.find((item: any) => item.allergy_to == qData)
        ?.has_condition || false,
    medication_list:
      allergiesMedicalHistory?.find((item: any) => item.allergy_to == qData)
        ?.allergy_type?.length > 1
        ? allergiesMedicalHistory
            ?.find((item: any) => item.allergy_to == qData)
            ?.allergy_type?.toString()
            ?.split(',')
        : '' || [],
  };

  const TagsComponent = () => {
    return (
      <TagsCloudInput
        question={'Please list these medications'}
        data={medication_list}
        setData={async (value: any) => {
          logNow('redux', allergiesMedicalHistory);
          let updatedItems = [];
          if (allergiesMedicalHistory) {
            updatedItems = allergiesMedicalHistory?.map((el) =>
              el.allergy_to === qData
                ? { ...el, allergy_type: value ? value.toString() : [] }
                : el
            );
          } else {
            updatedItems[0] = {
              has_condition: true,
              allergy_to: qData,
              allergy_type: value ? value.toString() : [],
            };
          }
          await dispatch(addAllergiesConditionsUpdate(updatedItems));
          logNow('redux', updatedItems);
        }}
      />
    );
  };

  const RadioBtn = () => {
    return (
      <>
        <Text
          style={{
            fontSize: responsiveFontSize(25),
            fontFamily: GlobalFonts.medium,
            color: colors.darkPrimary,
            paddingLeft: widthToDp(6),
          }}
        >
          {qData + ' Allergies'}
        </Text>
        <GeneralRadioQuestions
          options={['No', 'Yes']}
          isTrue={has_condition ? 'Yes' : 'No'}
          setIsTrue={async (value: any) => {
            logNow('redux', has_condition);
            let updatedItems = [];
            if (
              allergiesMedicalHistory.some((item) => item.allergy_to == qData)
            ) {
              updatedItems = allergiesMedicalHistory?.map((el) =>
                el.allergy_to === qData
                  ? {
                      ...el,
                      has_condition: value == 'Yes' ? true : false,
                      allergy_to: qData,
                      allergy_type: '',
                    }
                  : el
              );
            } else {
              updatedItems.push({
                has_condition: value == 'Yes' ? true : false,
                allergy_to: qData,
                allergy_type: '',
              });
            }
            await dispatch(addAllergiesConditionsUpdate(updatedItems));
            logNow('redux', updatedItems);
          }}
        />
        {has_condition ? <TagsComponent /> : null}
      </>
    );
  };

  var allTsxFields = [];
  if (qData) {
    allTsxFields.push(<RadioBtn />);
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
