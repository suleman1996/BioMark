import { CheckBoxWithText, Modal } from 'components/base';
import React, { useState } from 'react';
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

type Props = {
  setIsVisible: any;
  isVisible: boolean;
};

const CovidHealthDeclarationModal = (props: Props) => {
  const { setIsVisible, isVisible } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const constData = JsonFile.pages.covid.bookCovid.covidHealthcare;
  const qData = JsonFile.pages.covid.bookCovid.declaration;
  const headerTitle = false
    ? qData.declarationHeaderUser
    : qData.declarationHeaderDependant;
  const q1 = false ? qData.question1 : qData.dquestion1;
  const q2 = false ? qData.question2 : qData.dquestion2;
  const q3 = false ? qData.question3 : qData.dquestion3;
  const q4 = false ? qData.question4 : qData.dquestion4;
  const q5 = false ? qData.question5 : qData.dquestion5;
  const terms = qData.terms;

  // 3. Generate QRCode

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>COVID-19 Health Declaration Form</Text>
        <View style={styles.horizontalLine} />
        <Text style={styles.desc}>
          {`${constData.covidTitle1} --10/06/2022-- ${constData.covidTitle2} --8:10 AM-- ${constData.covidTitle3}`}
        </Text>

        <View style={styles.cardParent}>
          <View style={styles.parent}>
            <Pressable
              onPress={() => {
                setIsCardOpen(!isCardOpen);
              }}
              style={styles.cardContainer}
            >
              <Text style={styles.titleText}>Dependents</Text>
              <View style={styles.bookingStatusContainer}>
                <Text style={styles.statusText}>Not Booked Yet</Text>
                <Entypo
                  size={responsiveFontSize(30)}
                  name={true ? 'chevron-small-down' : 'chevron-small-right'}
                />
              </View>
            </Pressable>
            {isCardOpen ? <View style={styles.headerLine} /> : null}
            <ExpandableView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              show={isCardOpen}
            >
              <ScrollView
                style={{ height: heightToDp(40) }}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.expendedContainer}>
                  <Text style={styles.innerTitle}>{headerTitle}</Text>
                  <Text style={styles.q}>{q1}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.radio}>
                      <RadioButton
                        value={'Yes'}
                        status={true ? 'checked' : 'unchecked'}
                        color={colors.darkPrimary}
                      />
                      <Text style={styles.radioText}>Yes</Text>
                    </View>
                    <View style={styles.radio}>
                      <RadioButton
                        value={'Yes'}
                        status={true ? 'checked' : 'unchecked'}
                        color={colors.darkPrimary}
                      />
                      <Text style={styles.radioText}>No</Text>
                    </View>
                  </View>

                  <Text style={styles.q}>{q2}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.radio}>
                      <RadioButton
                        value={'Yes'}
                        status={true ? 'checked' : 'unchecked'}
                        color={colors.darkPrimary}
                      />
                      <Text style={styles.radioText}>Yes</Text>
                    </View>
                    <View style={styles.radio}>
                      <RadioButton
                        value={'Yes'}
                        status={true ? 'checked' : 'unchecked'}
                        color={colors.darkPrimary}
                      />
                      <Text style={styles.radioText}>No</Text>
                    </View>
                  </View>

                  <Text style={styles.q}>{q3}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.radio}>
                      <RadioButton
                        value={'Yes'}
                        status={true ? 'checked' : 'unchecked'}
                        color={colors.darkPrimary}
                      />
                      <Text style={styles.radioText}>Yes</Text>
                    </View>
                    <View style={styles.radio}>
                      <RadioButton
                        value={'Yes'}
                        status={true ? 'checked' : 'unchecked'}
                        color={colors.darkPrimary}
                      />
                      <Text style={styles.radioText}>No</Text>
                    </View>
                  </View>

                  <Text style={styles.q}>{q4}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.radio}>
                      <RadioButton
                        value={'Yes'}
                        status={true ? 'checked' : 'unchecked'}
                        color={colors.darkPrimary}
                      />
                      <Text style={styles.radioText}>Yes</Text>
                    </View>
                    <View style={styles.radio}>
                      <RadioButton
                        value={'Yes'}
                        status={true ? 'checked' : 'unchecked'}
                        color={colors.darkPrimary}
                      />
                      <Text style={styles.radioText}>No</Text>
                    </View>
                  </View>

                  <Text style={styles.q}>{q5}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.radio}>
                      <RadioButton
                        value={'Yes'}
                        status={true ? 'checked' : 'unchecked'}
                        color={colors.darkPrimary}
                      />
                      <Text style={styles.radioText}>Yes</Text>
                    </View>
                    <View style={styles.radio}>
                      <RadioButton
                        value={'Yes'}
                        status={true ? 'checked' : 'unchecked'}
                        color={colors.darkPrimary}
                      />
                      <Text style={styles.radioText}>No</Text>
                    </View>
                  </View>

                  <View
                    style={{ marginTop: heightToDp(2), width: widthToDp(75) }}
                  >
                    <CheckBoxWithText
                      rightText={terms}
                      isChecked={true}
                      // setIsChecked={(value: any) => {
                      //   undefined;
                      // }}
                    />
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
                        setIsVisible(false);
                      }}
                      style={styles.btnDisable}
                    >
                      <Text style={[styles.btnText2]}>Submit</Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            </ExpandableView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CovidHealthDeclarationModal;
