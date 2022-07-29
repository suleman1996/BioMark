/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckBoxWithText, Modal } from 'components/base';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
import makeStyles from './styles';
import { navigate } from '../../../services/nav-ref';
import SCREENS from 'navigation/constants';
import JsonFile from '../../../i18n/en.json';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import Entypo from 'react-native-vector-icons/Entypo';
import ExpandableView from '@pietile-native-kit/expandable-view';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { dateFormat1, getTime } from 'utils/functions/date-format';
import { covidService } from 'services/covid-service';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookingsDataR } from 'store/covid/covid-actions';
import HealthDeclartionCompleted from 'components/ui/health-declaration-completed';
import { IAppState } from 'store/IAppState';

type Props = {
  setIsVisible: any;
  isVisible: boolean;
  data?: any;
};

const CovidHealthDeclarationForAllUpCommingModal = (props: Props) => {
  const allUpcommingBookings = useSelector(
    (state: IAppState) => state.covid.allBookingsData.upcoming
  );
  const { setIsVisible, isVisible, data } = props;
  const item = data;
  const {
    patient_name = '',
    booking_id = '',
    booking_schedule_date = '',
    booking_slot_time = '',
    is_dependent = false,
  } = {
    patient_name: item.patient_name,
    booking_id: item.reference_code,
    booking_schedule_date: item?.booking_schedule?.toString(),
    booking_slot_time: item.booking_slot_time,
    is_dependent: item.is_dependent,
  };
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [isRender, setIsRender] = useState(false);
  const styles = makeStyles(colors);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const constData = JsonFile.pages.covid.bookCovid.covidHealthcare;
  const qData = JsonFile.pages.covid.bookCovid.declaration;
  const headerTitle = false
    ? qData.declarationHeaderUser
    : qData.declarationHeaderDependant;
  const qu1 = false ? qData.question1 : qData.dquestion1;
  const qu2 = false ? qData.question2 : qData.dquestion2;
  const qu3 = false ? qData.question3 : qData.dquestion3;
  const qu4 = false ? qData.question4 : qData.dquestion4;
  const qu5 = false ? qData.question5 : qData.dquestion5;

  const termsDesc = qData.terms;

  const [isDeclared, setIsDeclared] = useState(false);
  const [isDecCompleted, setIsDecCompleted] = useState(false);
  const [filterdData, setFilterdData] = useState([]);
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    dispatch(getAllBookingsDataR());
    setIsRender(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRender]);
  useEffect(() => {
    let arr = [];
    allUpcommingBookings.map((ele) => {
      if (!ele?.declaration_complete && ele?.declaration_enabled) {
        arr.push({
          id: ele.id,
          q1: null,
          q2: null,
          q3: null,
          q4: null,
          q5: null,
          terms: null,
          selected: true,
        });
      }
    });
    setFormData(arr);
    /*eslint-disable */
  }, []);
  useEffect(() => {
    let arr = [];
    allUpcommingBookings.map((ele) => {
      if (!ele?.declaration_complete && ele?.declaration_enabled) {
        arr.push(ele);
      }
    });
    setFilterdData(arr);
    /*eslint-disable */
  }, []);

  const getAllBookingsData = async () => {
    await dispatch(getAllBookingsDataR());
  };

  const checkSelected = (index) => {
    setFormData((prev) => {
      const formDataElement = prev[index];
      if (
        !(
          formDataElement.q1 == null ||
          formDataElement.q2 == null ||
          formDataElement.q3 == null ||
          formDataElement.q4 == null ||
          formDataElement.q5 == null ||
          formDataElement.terms == null
        )
      ) {
        prev[index].selected = false;
      }
      return prev;
    });
  };
  const sendDataToServer = async () => {
    covidService
      .updateMultiPleHealthDeclaration(formData)
      .then(() => {
        setIsVisible(false);
        getAllBookingsData();
        setIsDecCompleted(true);
      })
      .catch((err) => {
        // setIsVisible(false);
      });
  };
  const validationForm = () => {
    formData.map((ele) => {
      if (
        ele.q1 == null ||
        ele.q2 == null ||
        ele.q3 == null ||
        ele.q4 == null ||
        ele.q5 == null ||
        ele.terms == false
      ) {
        setIsDeclared(false);
      } else {
        setIsDeclared(true);
      }
    });
  };
  /*eslint-enable */

  if (data) {
    return (
      <>
        <HealthDeclartionCompleted
          setIsVisible={setIsDecCompleted}
          isVisible={isDecCompleted}
          name={patient_name}
          code={booking_id}
          isDependant={is_dependent}
        />
        <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ height: heightToDp(75) }}
              nestedScrollEnabled
            >
              <Text style={styles.title}>COVID-19 Health Declaration Form</Text>
              <View style={styles.horizontalLine} />
              <Text style={styles.desc}>
                {`${constData.covidTitle1} ${dateFormat1(
                  booking_schedule_date
                )} ${constData.covidTitle2} ${getTime(booking_slot_time)} ${
                  constData.covidTitle3
                }`}
              </Text>
              {filterdData?.map((ele, index) => {
                const a =
                  formData[index].q1 == null ||
                  formData[index].q2 == null ||
                  formData[index].q3 == null ||
                  formData[index].q4 == null ||
                  formData[index].q5 == null ||
                  formData[index].terms == null;
                const b = formData[index].selected;

                return (
                  <>
                    <View style={styles.cardParent}>
                      <View style={styles.parent}>
                        <Pressable
                          onPress={() => {
                            // setIsCardOpen(!isCardOpen);
                            setFormData((prev) => {
                              const newVal = [...prev];
                              newVal[index].selected = !newVal[index].selected;
                              return newVal;
                            });
                          }}
                          style={styles.cardContainer}
                        >
                          <View>
                            <Text style={styles.titleText}>
                              {ele?.patient_name}
                            </Text>
                            <Text style={styles.titleText}>
                              {ele?.reference_code}
                            </Text>
                          </View>
                          <View style={styles.bookingStatusContainer}>
                            {isCardOpen ? null : (
                              <Text
                                style={[
                                  styles.statusText,
                                  formData[index].q1 != null &&
                                  formData[index].q2 != null &&
                                  formData[index].q3 != null &&
                                  formData[index].q4 != null &&
                                  formData[index].q5 != null &&
                                  formData[index].terms
                                    ? { color: colors.lightGreen }
                                    : {},
                                ]}
                              >
                                {formData[index].q1 != null &&
                                formData[index].q2 != null &&
                                formData[index].q3 != null &&
                                formData[index].q4 != null &&
                                formData[index].q5 != null &&
                                formData[index].terms
                                  ? 'Declared'
                                  : 'Not Declared'}
                              </Text>
                            )}

                            <Entypo
                              size={responsiveFontSize(30)}
                              name={
                                true
                                  ? 'chevron-small-down'
                                  : 'chevron-small-right'
                              }
                            />
                          </View>
                        </Pressable>
                        {isCardOpen ? <View style={styles.headerLine} /> : null}
                        <ExpandableView
                          keyboardShouldPersistTaps="always"
                          showsVerticalScrollIndicator={false}
                          show={(a && b) || (!a && b)}
                        >
                          <View>
                            <View style={styles.expendedContainer}>
                              <Text style={styles.innerTitle}>
                                {headerTitle}
                              </Text>
                              <Text style={styles.q}>{qu1}</Text>
                              <View style={{ flexDirection: 'row' }}>
                                <View style={styles.radio}>
                                  <RadioButton
                                    value={'Yes'}
                                    status={
                                      formData[index].q1 == true
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    onPress={() => {
                                      setFormData((prev) => {
                                        const newVal = [...prev];
                                        newVal[index].q1 = true;
                                        return newVal;
                                      });

                                      validationForm();
                                      checkSelected(index);
                                    }}
                                    color={colors.darkPrimary}
                                  />
                                  <Text style={styles.radioText}>Yes</Text>
                                </View>
                                <View style={styles.radio}>
                                  <RadioButton
                                    value={'Yes'}
                                    status={
                                      formData[index].q1 == false
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    onPress={() => {
                                      setFormData((prev) => {
                                        const newVal = [...prev];
                                        newVal[index].q1 = false;
                                        return newVal;
                                      });
                                      validationForm();
                                      checkSelected(index);
                                    }}
                                    color={colors.darkPrimary}
                                  />
                                  <Text style={styles.radioText}>No</Text>
                                </View>
                              </View>

                              <Text style={styles.q}>{qu2}</Text>
                              <View style={{ flexDirection: 'row' }}>
                                <View style={styles.radio}>
                                  <RadioButton
                                    value={'Yes'}
                                    status={
                                      formData[index].q2
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    color={colors.darkPrimary}
                                    onPress={() => {
                                      setFormData((prev) => {
                                        const newVal = [...prev];
                                        newVal[index].q2 = true;
                                        return newVal;
                                      });
                                      validationForm();
                                      checkSelected(index);
                                    }}
                                  />
                                  <Text style={styles.radioText}>Yes</Text>
                                </View>
                                <View style={styles.radio}>
                                  <RadioButton
                                    value={'Yes'}
                                    status={
                                      formData[index].q2 == false
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    color={colors.darkPrimary}
                                    onPress={() => {
                                      setFormData((prev) => {
                                        const newVal = [...prev];
                                        newVal[index].q2 = false;
                                        return newVal;
                                      });
                                      validationForm();
                                      checkSelected(index);
                                    }}
                                  />
                                  <Text style={styles.radioText}>No</Text>
                                </View>
                              </View>

                              <Text style={styles.q}>{qu3}</Text>
                              <View style={{ flexDirection: 'row' }}>
                                <View style={styles.radio}>
                                  <RadioButton
                                    value={'Yes'}
                                    status={
                                      formData[index].q3
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    color={colors.darkPrimary}
                                    onPress={() => {
                                      setFormData((prev) => {
                                        const newVal = [...prev];
                                        newVal[index].q3 = true;
                                        return newVal;
                                      });
                                      validationForm();
                                      checkSelected(index);
                                    }}
                                  />
                                  <Text style={styles.radioText}>Yes</Text>
                                </View>
                                <View style={styles.radio}>
                                  <RadioButton
                                    value={'Yes'}
                                    status={
                                      formData[index].q3 == false
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    color={colors.darkPrimary}
                                    onPress={() => {
                                      setFormData((prev) => {
                                        const newVal = [...prev];
                                        newVal[index].q3 = false;
                                        return newVal;
                                      });
                                      validationForm();
                                      checkSelected(index);
                                    }}
                                  />
                                  <Text style={styles.radioText}>No</Text>
                                </View>
                              </View>

                              <Text style={styles.q}>{qu4}</Text>
                              <View style={{ flexDirection: 'row' }}>
                                <View style={styles.radio}>
                                  <RadioButton
                                    value={'Yes'}
                                    status={
                                      formData[index].q4
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    color={colors.darkPrimary}
                                    onPress={() => {
                                      setFormData((prev) => {
                                        const newVal = [...prev];
                                        newVal[index].q4 = true;
                                        return newVal;
                                      });
                                      validationForm();
                                      checkSelected(index);
                                    }}
                                  />
                                  <Text style={styles.radioText}>Yes</Text>
                                </View>
                                <View style={styles.radio}>
                                  <RadioButton
                                    value={'Yes'}
                                    status={
                                      formData[index].q4 == false
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    color={colors.darkPrimary}
                                    onPress={() => {
                                      setFormData((prev) => {
                                        const newVal = [...prev];
                                        newVal[index].q4 = false;
                                        return newVal;
                                      });
                                      validationForm();
                                      checkSelected(index);
                                    }}
                                  />
                                  <Text style={styles.radioText}>No</Text>
                                </View>
                              </View>

                              <Text style={styles.q}>{qu5}</Text>
                              <View style={{ flexDirection: 'row' }}>
                                <View style={styles.radio}>
                                  <RadioButton
                                    value={'Yes'}
                                    status={
                                      formData[index].q5 == true
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    color={colors.darkPrimary}
                                    onPress={() => {
                                      setFormData((prev) => {
                                        const newVal = [...prev];
                                        newVal[index].q5 = true;
                                        return newVal;
                                      });
                                      validationForm();
                                      checkSelected(index);
                                    }}
                                  />
                                  <Text style={styles.radioText}>Yes</Text>
                                </View>
                                <View style={styles.radio}>
                                  <RadioButton
                                    value={'Yes'}
                                    status={
                                      formData[index].q5 == false
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    color={colors.darkPrimary}
                                    onPress={() => {
                                      setFormData((prev) => {
                                        const newVal = [...prev];
                                        newVal[index].q5 = false;
                                        return newVal;
                                      });
                                      validationForm();
                                      checkSelected(index);
                                    }}
                                  />
                                  <Text style={styles.radioText}>No</Text>
                                </View>
                              </View>

                              <View
                                style={{
                                  marginTop: heightToDp(2),
                                  width: widthToDp(75),
                                }}
                              >
                                <CheckBoxWithText
                                  rightText={termsDesc}
                                  isChecked={formData[index].terms}
                                  setIsChecked={(value: any) => {
                                    setFormData((prev) => {
                                      const newVal = [...prev];
                                      newVal[index].terms = value;
                                      return newVal;
                                    });
                                    validationForm();
                                    checkSelected(index);
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        </ExpandableView>
                      </View>
                    </View>
                  </>
                );
              })}
            </ScrollView>
            <View style={styles.bottom2Btns}>
              <Pressable
                onPress={() =>
                  navigate(SCREENS.MAIN_NAVIGATOR, {
                    screen: SCREENS.HOME,
                  })
                }
                style={[styles.btn, { backgroundColor: colors.white }]}
              >
                <Text style={[styles.btnText]}>Do later</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (isCardOpen) {
                    setIsCardOpen(false);
                  } else {
                    sendDataToServer();
                  }
                }}
                disabled={!isDeclared}
                style={isDeclared ? styles.btnEnable : styles.btnDisable}
              >
                <Text style={[styles.btnText2]}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
    );
  } else {
    return <View />;
  }
};

export default CovidHealthDeclarationForAllUpCommingModal;
