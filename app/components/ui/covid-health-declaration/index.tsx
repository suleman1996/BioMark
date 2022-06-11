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
import { useDispatch } from 'react-redux';
import { getAllBookingsDataR } from 'store/covid/covid-actions';
import HealthDeclartionCompleted from '../healthDeclarationCompleted';

type Props = {
  setIsVisible: any;
  isVisible: boolean;
  data?: any;
};

const CovidHealthDeclarationModal = (props: Props) => {
  const { setIsVisible, isVisible, data } = props;
  const item = data;
  const {
    patient_name = '',
    booking_id = '',
    // booking_test_type = '',
    // test_centre_name = '',
    booking_schedule_date = '',
    booking_slot_time = '',
    // test_country_name = '',
    // test_city_name = '',
    // declaration_enabled = false,
    // // declaration_complete = false,
    // is_cancellable = false,
    is_dependent = false,
  } = {
    patient_name: item.patient_name,
    booking_id: item.reference_code,
    // booking_test_type: item.booking_test_type,
    // test_centre_name: item.test_centre_name,
    booking_schedule_date: item?.booking_schedule?.toString(),
    booking_slot_time: item.booking_slot_time,
    // test_country_name: item.test_country_name,
    // test_city_name: item.test_city_name,
    // declaration_enabled: item.declaration_enabled,
    // declaration_complete: item.declaration_complete,
    // is_cancellable: item.is_cancellable,
    is_dependent: item.is_dependent,
  };
  const { colors } = useTheme();
  const dispatch = useDispatch();
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

  const id = item.id;
  let [q1, setQ1] = useState<any>(null);
  let [q2, setQ2] = useState<any>(null);
  let [q3, setQ3] = useState<any>(null);
  let [q4, setQ4] = useState<any>(null);
  let [q5, setQ5] = useState<any>(null);
  let [terms, setTerms] = useState<any>(null);
  const termsDesc = qData.terms;

  const [isDeclared, setIsDeclared] = useState(false);
  const [isDecCompleted, setIsDecCompleted] = useState(false);

  // 3. Generate QRCode

  useEffect(() => {
    const isEnabled =
      q1 !== null &&
      q2 !== null &&
      q3 !== null &&
      q4 !== null &&
      q5 !== null &&
      terms !== null &&
      terms !== false
        ? true
        : false;
    setIsDeclared(isEnabled);
  }, [q1, q2, q3, q4, q5, terms]);

  /*eslint-disable */
  const getAllBookingsData = async () => {
    await dispatch(getAllBookingsDataR());
  };

  const sendDataToServer = async () => {
    covidService
      .updateHealthDeclaration({ id, q1, q2, q3, q4, q5, terms })
      .then(() => {
        setIsVisible(false);
        getAllBookingsData();
        setIsDecCompleted(true);
      })
      .catch((err) => {
        // setIsVisible(false);
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

              <View style={styles.cardParent}>
                <View style={styles.parent}>
                  <Pressable
                    onPress={() => {
                      setIsCardOpen(!isCardOpen);
                    }}
                    style={styles.cardContainer}
                  >
                    <Text style={styles.titleText}>
                      {is_dependent ? patient_name : 'You'}
                    </Text>
                    <View style={styles.bookingStatusContainer}>
                      {isCardOpen ? null : (
                        <Text
                          style={[
                            styles.statusText,
                            isDeclared ? { color: colors.lightGreen } : {},
                          ]}
                        >
                          {isDeclared ? 'Declared' : 'Not Declared'}
                        </Text>
                      )}

                      <Entypo
                        size={responsiveFontSize(30)}
                        name={
                          true ? 'chevron-small-down' : 'chevron-small-right'
                        }
                      />
                    </View>
                  </Pressable>
                  {isCardOpen ? <View style={styles.headerLine} /> : null}
                  <ExpandableView
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    show={isCardOpen}
                  >
                    <View
                    // style={{ height: heightToDp(40) }}
                    // nestedScrollEnabled
                    // showsVerticalScrollIndicator={false}
                    >
                      <View style={styles.expendedContainer}>
                        <Text style={styles.innerTitle}>{headerTitle}</Text>
                        <Text style={styles.q}>{qu1}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={styles.radio}>
                            <RadioButton
                              value={'Yes'}
                              status={q1 ? 'checked' : 'unchecked'}
                              onPress={() => setQ1(true)}
                              color={colors.darkPrimary}
                            />
                            <Text style={styles.radioText}>Yes</Text>
                          </View>
                          <View style={styles.radio}>
                            <RadioButton
                              value={'Yes'}
                              status={q1 == false ? 'checked' : 'unchecked'}
                              onPress={() => setQ1(false)}
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
                              status={q2 ? 'checked' : 'unchecked'}
                              color={colors.darkPrimary}
                              onPress={() => setQ2(true)}
                            />
                            <Text style={styles.radioText}>Yes</Text>
                          </View>
                          <View style={styles.radio}>
                            <RadioButton
                              value={'Yes'}
                              status={q2 == false ? 'checked' : 'unchecked'}
                              color={colors.darkPrimary}
                              onPress={() => setQ2(false)}
                            />
                            <Text style={styles.radioText}>No</Text>
                          </View>
                        </View>

                        <Text style={styles.q}>{qu3}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={styles.radio}>
                            <RadioButton
                              value={'Yes'}
                              status={q3 ? 'checked' : 'unchecked'}
                              color={colors.darkPrimary}
                              onPress={() => setQ3(true)}
                            />
                            <Text style={styles.radioText}>Yes</Text>
                          </View>
                          <View style={styles.radio}>
                            <RadioButton
                              value={'Yes'}
                              status={q3 == false ? 'checked' : 'unchecked'}
                              color={colors.darkPrimary}
                              onPress={() => setQ3(false)}
                            />
                            <Text style={styles.radioText}>No</Text>
                          </View>
                        </View>

                        <Text style={styles.q}>{qu4}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={styles.radio}>
                            <RadioButton
                              value={'Yes'}
                              status={q4 ? 'checked' : 'unchecked'}
                              color={colors.darkPrimary}
                              onPress={() => setQ4(true)}
                            />
                            <Text style={styles.radioText}>Yes</Text>
                          </View>
                          <View style={styles.radio}>
                            <RadioButton
                              value={'Yes'}
                              status={q4 == false ? 'checked' : 'unchecked'}
                              color={colors.darkPrimary}
                              onPress={() => setQ4(false)}
                            />
                            <Text style={styles.radioText}>No</Text>
                          </View>
                        </View>

                        <Text style={styles.q}>{qu5}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={styles.radio}>
                            <RadioButton
                              value={'Yes'}
                              status={q5 ? 'checked' : 'unchecked'}
                              color={colors.darkPrimary}
                              onPress={() => setQ5(true)}
                            />
                            <Text style={styles.radioText}>Yes</Text>
                          </View>
                          <View style={styles.radio}>
                            <RadioButton
                              value={'Yes'}
                              status={q5 == false ? 'checked' : 'unchecked'}
                              color={colors.darkPrimary}
                              onPress={() => setQ5(false)}
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
                            isChecked={terms}
                            setIsChecked={(value: any) => {
                              setTerms(value);
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </ExpandableView>
                </View>
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
                      //
                    }}
                    disabled={!isDeclared}
                    style={isDeclared ? styles.btnEnable : styles.btnDisable}
                  >
                    <Text style={[styles.btnText2]}>Submit</Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </>
    );
  } else {
    return <View />;
  }
};

export default CovidHealthDeclarationModal;
