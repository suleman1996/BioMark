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
import { ActivityIndicator } from 'components';
import { useIsFocused } from '@react-navigation/native';
import { TextInput } from 'components';
import colors from 'assets/colors';
import fonts from 'assets/fonts';

import { GlobalColors } from 'utils/theme/global-colors';
import { userService } from 'services/user-service/user-service';
import { navigate } from 'services/nav-ref';
import { showMessage } from 'react-native-flash-message';
import SCREENS from 'navigation/constants';
import { useSelector } from 'react-redux';

import { options } from './year';
import { styles } from './styles';

export default function SmokingScreen() {
  const [value, setValue] = useState('');
  const [isSmoking, setIsSmoking] = useState('');
  const [day, setDay] = useState('');
  const [stopSmoke, setStopSmoke] = useState('');
  const [startSmoke, setStartSmoke] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);
  const options2 = [{ title: '2020' }, { title: '2021' }];
  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);

  const isFocus = useIsFocused();

  useEffect(() => {
    handleLifeStyle();
    console.log(bootstrap, 'bootstrap');
  }, [isFocus, bootstrap]);

  const onSubmit = async () => {
    try {
      setIsVisible(true);
      const response = await userService.Smoking(
        day,
        stopSmoke,
        startSmoke,
        isSmoking
      );
      console.log('smoking successful', response.data);
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
      console.log('hahah ', result?.data?.smoking?.is_smoking);
      setValue(
        result?.data?.smoking?.is_smoking == 'No'
          ? '0'
          : result?.data?.smoking?.is_smoking == 'Yes'
          ? '1'
          : result?.data?.smoking?.is_smoking == 'I used to'
          ? '2'
          : '0'
      );
      setDay(result?.data?.smoking?.stick_per_day);
      setStopSmoke(result?.data?.smoking?.smoking_stop_at);
      setStartSmoke(result?.data?.smoking?.smoking_start_at);
      setIsSmoking(
        result?.data?.smoking?.is_smoking == 'No'
          ? '0'
          : result?.data?.smoking?.is_smoking == 'Yes'
          ? '1'
          : result?.data?.smoking?.is_smoking == 'I used to'
          ? '2'
          : '0'
      );
      console.log('smoking data', result.data.smoking);
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
      <TitleWithBackLayout title="Smoking">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>
            {
              bootstrap?.attributes?.medical_template?.smoking[0]?.content
                ?.fields[0]?.question
            }
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <TouchableOpacity
              onPress={() => {
                setValue('0'), setIsSmoking('No');
              }}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == '0' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == '0' ? GlobalColors.white : null}
                value="0"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == '0' ? '#ffffff' : '#000000' },
                ]}
              >
                {
                  bootstrap?.attributes?.medical_template?.smoking[0]?.content
                    ?.fields[0]?.options[0]
                }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setValue('1'), setIsSmoking('Yes');
              }}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == '1' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == '1' ? GlobalColors.white : null}
                value="1"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == '1' ? '#ffffff' : '#000000' },
                ]}
              >
                {
                  bootstrap?.attributes?.medical_template?.smoking[0]?.content
                    ?.fields[0]?.options[1]
                }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setValue('2'), setIsSmoking('I used to');
              }}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == '2' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == '2' ? GlobalColors.white : null}
                value="2"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == '2' ? '#ffffff' : '#000000' },
                ]}
              >
                {
                  bootstrap?.attributes?.medical_template?.smoking[0]?.content
                    ?.fields[0]?.options[2]
                }
              </Text>
            </TouchableOpacity>
          </RadioButton.Group>

          {value !== '0' ? (
            <View>
              <Text style={styles.label}>
                {
                  bootstrap?.attributes?.medical_template?.smoking[0]?.content
                    ?.fields[1]?.question
                }{' '}
              </Text>
              <View
                style={[
                  styles.textinputView,
                  { borderWidth: day ? 1 : null, borderRadius: day ? 5 : null },
                ]}
              >
                <TextInput
                  value={day + ''}
                  // defaultValue={'hello'}
                  onChange={setDay}
                  margin={0}
                  keyboardType="numeric"
                  svg={undefined}
                />
              </View>

              <Text style={styles.label}>
                {
                  bootstrap?.attributes?.medical_template?.smoking[0]?.content
                    ?.fields[2]?.question
                }
              </Text>
              <View style={styles.container2}>
                <Picker
                  itemStyle={{ fontFamily: 'Rubik-Regular' }}
                  style={{
                    color: colors.black,
                    fontFamily: fonts.regular,
                  }}
                  selectedValue={startSmoke + ''}
                  onValueChange={(itemValue) => setStartSmoke(itemValue)}
                >
                  {options?.map((item, index) => {
                    return (
                      <Picker.Item
                        style={{ color: GlobalColors.darkGray }}
                        key={index}
                        label={item.title}
                        value={item.title}
                      />
                    );
                  })}
                </Picker>
              </View>

              {value == '2' ? (
                <View>
                  <Text style={styles.label}>
                    {
                      bootstrap?.attributes?.medical_template?.smoking[0]
                        ?.content?.fields[3]?.question
                    }{' '}
                  </Text>
                  <View style={styles.container2}>
                    <Picker
                      style={{ color: colors.black, fontFamily: fonts.regular }}
                      selectedValue={stopSmoke + ''}
                      onValueChange={(itemValue) => setStopSmoke(itemValue)}
                    >
                      {options2?.map((item, index) => {
                        return (
                          <Picker.Item
                            style={{ color: GlobalColors.darkGray }}
                            key={index}
                            label={item.title}
                            value={item.title}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
        <ButtonWithShadowContainer title="Save" onPress={onSubmit} />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}
