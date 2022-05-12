import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import { userService } from 'services/user-service/user-service';
import { useSelector } from 'react-redux';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';
import fonts from 'assets/fonts';

import { ActivityIndicator } from 'components';
import { GlobalColors } from 'utils/theme/global-colors';

import colors from 'assets/colors';

import { styles } from './styles';

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
  const [value, setValue] = useState('');
  const [isExercise, setIsExercise] = useState('');
  const [exerciseWeek, setExerciseWeek] = useState('');
  const [exerciseSession, setExerciseSession] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);
  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);

  useEffect(() => {
    console.log(bootstrap, 'bootstrap');
    handleLifeStyle();
  }, [bootstrap]);

  const onSave = async () => {
    try {
      setIsVisible(true);
      const response = await userService.exercise({
        lifestyle: {
          is_exercise: isExercise,
          exercise_per_week: exerciseWeek,
          exercise_per_session: exerciseSession,
        },
      });
      console.log(response.data);
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
        <Text style={{ color: 'red' }}>{isExercise}</Text>
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
                  backgroundColor:
                    value == 'first' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == 'first' ? GlobalColors.white : null}
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
                  backgroundColor:
                    value == 'second' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == 'second' ? GlobalColors.white : null}
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
                <Picker
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
                        color={colors.placeHolder}
                      />
                    );
                  })}
                </Picker>
              </View>
              <Text style={styles.label}>
                {
                  bootstrap?.attributes?.medical_template?.exercise[0]?.content
                    ?.fields[2]?.question
                }
              </Text>
              <View style={styles.container2}>
                <Picker
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
                        color={colors.placeHolder}
                      />
                    );
                  })}
                </Picker>
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
