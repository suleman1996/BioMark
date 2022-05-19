import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { RadioButton } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import { userService } from 'services/user-service/user-service';
import { useSelector } from 'react-redux';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';
import fonts from 'assets/fonts';

import { ActivityIndicator } from 'components';

import makeStyles from './styles';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const Options = [
  { title: '' },
  { title: '1' },
  { title: '2' },
  { title: '3' },
  { title: '4' },
  { title: '5' },
  { title: '6' },
  { title: '7' },
  { title: '8' },
  { title: '9' },
  { title: 'more than 10' },
];

const Options2 = [
  { title: '' },
  { title: 'less than 20 mins' },
  { title: '20-40 mins' },
  { title: '40-60 mins' },
  { title: '1-2 hours' },
  { title: '2-3 hours' },
  { title: 'more than 3 hours' },
];

export default function ExerciseScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [value, setValue] = useState('');
  const [isExercise, setIsExercise] = useState('');
  const [exerciseWeek, setExerciseWeek] = useState('');
  const [exerciseSession, setExerciseSession] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);
  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  useEffect(() => {
    console.log(bootstrap, 'bootstrap');
    handleLifeStyle();
  }, [bootstrap]);

  const onSave = async () => {
    try {
      setIsVisible(true);
      if (isExercise === 'true') {
        const response = await userService.exercise({
          lifestyle: {
            is_exercise: isExercise,
            exercise_per_week: exerciseWeek,
            exercise_per_session: exerciseSession,
          },
        });
        console.log(response.data);
      } else {
        const response = await userService.exercise({
          lifestyle: {
            is_exercise: false,
            exercise_per_week: null,
            exercise_per_session: null,
          },
        });
        console.log(response.data);
      }
      navigate(SCREENS.EDIT_PROFILE);
      setIsVisible(false);
    } catch (err) {
      setIsVisible(false);
      console.log(err);
    }
  };

  const handleLifeStyle = async () => {
    try {
      setIsVisible(true);
      const result = await userService.getLifeStyle();
      setValue(
        result?.data?.exercise?.is_exercise == false
          ? 'first'
          : result?.data?.exercise?.is_exercise == true
          ? 'second'
          : null
      );
      setExerciseWeek(result?.data?.exercise?.exercise_per_week);
      setExerciseSession(result?.data?.exercise?.exercise_per_session);
      setIsExercise(result?.data?.exercise?.is_exercise ? 'second' : 'first');
      console.log('Exercise data', result?.data?.exercise?.is_exercise);
      setIsVisible(false);
    } catch (error) {
      setIsVisible(false);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={isVisiable} />
      <TitleWithBackLayout title="Exercise">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>
            {
              bootstrap?.attributes?.medical_template?.exercise[0]?.content
                ?.fields[0]?.question
            }
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <TouchableOpacity
              onPress={() => {
                setValue('first'), setIsExercise('false');
              }}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == 'first' ? colors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == 'first' ? colors.white : null}
                value="first"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == 'first' ? '#ffffff' : '#000000' },
                ]}
              >
                {
                  bootstrap?.attributes?.medical_template?.exercise[0]?.content
                    ?.fields[0]?.options[0]
                }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setValue('second'), setIsExercise('true');
              }}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == 'second' ? colors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == 'second' ? colors.white : null}
                value="second"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == 'second' ? '#ffffff' : '#000000' },
                ]}
              >
                {
                  bootstrap?.attributes?.medical_template?.smoking[0]?.content
                    ?.fields[0]?.options[1]
                }
              </Text>
            </TouchableOpacity>
          </RadioButton.Group>

          {value !== 'first' ? (
            <View>
              <Text style={styles.label}>
                {
                  bootstrap?.attributes?.medical_template?.exercise[0]?.content
                    ?.fields[1]?.question
                }
              </Text>
              <View style={[styles.container2]}>
                <DropDown
                  mode={'flat'}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={exerciseWeek}
                  setValue={(text) => setExerciseWeek(text)}
                  list={Options}
                  inputProps={{
                    style: {
                      width: '100%',
                      height: heightToDp(6),
                      flex: 1,
                      borderRadius: widthToDp(2),
                      maxHeight: heightToDp(6.5),
                      color: colors.black,
                      fontFamily: fonts.regular,
                    },
                    underlineColor: '#fff',
                  }}
                />
                {/* <Picker
                  style={{ color: colors.black, fontFamily: fonts.regular }}
                  selectedValue={exerciseWeek}
                  onValueChange={(itemValue) => setExerciseWeek(itemValue)}
                >
                  {Options?.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.title}
                        value={item.title}
                        color={colors.lightGrey}
                      />
                    );
                  })}
                </Picker> */}
              </View>
              <Text style={styles.label}>
                {
                  bootstrap?.attributes?.medical_template?.exercise[0]?.content
                    ?.fields[2]?.question
                }
              </Text>
              <View style={styles.container2}>
                {/* <Picker
                  style={{ color: colors.black, fontFamily: fonts.regular }}
                  selectedValue={exerciseSession}
                  onValueChange={(itemValue) => setExerciseSession(itemValue)}
                >
                  {Options2?.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.title}
                        value={item.title}
                        color={colors.lightGrey}
                      />
                    );
                  })}
                </Picker> */}
                <DropDown
                  mode={'flat'}
                  visible={showDropDown2}
                  showDropDown={() => setShowDropDown2(true)}
                  onDismiss={() => setShowDropDown2(false)}
                  value={exerciseSession}
                  setValue={(text) => setExerciseSession(text)}
                  list={Options2}
                  inputProps={{
                    style: {
                      width: '100%',
                      height: heightToDp(6),
                      flex: 1,
                      borderRadius: widthToDp(2),
                      maxHeight: heightToDp(6.5),
                      color: colors.lightGrey,
                      fontFamily: fonts.regular,
                    },
                    underlineColor: '#fff',
                  }}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
        <ButtonWithShadowContainer
          title="Save"
          onPress={() => {
            onSave();
          }}
        />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}
