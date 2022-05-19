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
import { ActivityIndicator } from 'components';
import { useIsFocused } from '@react-navigation/native';
import { TextInput } from 'components';

import { userService } from 'services/user-service/user-service';
import { navigate } from 'services/nav-ref';
import { showMessage } from 'react-native-flash-message';
import SCREENS from 'navigation/constants';
import { useSelector } from 'react-redux';

import { options } from './year';
import makeStyles from './styles';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

export default function SmokingScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // const [value, setValue] = useState('');
  // const [isSmoking, setIsSmoking] = useState('');
  const [value, setValue] = useState(2);
  const [day, setDay] = useState('');
  const [stopSmoke, setStopSmoke] = useState('');
  const [startSmoke, setStartSmoke] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);
  const options2 = [{ title: '2020' }, { title: '2021' }];
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [showDropDown2, setShowDropDown2] = React.useState(false);
  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);

  const isFocus = useIsFocused();

  useEffect(() => {
    //  handleLifeStyle();
    console.log(
      'bootSt',
      bootstrap?.attributes?.medical_template.smoking[0].content.fields
    );
  }, [isFocus, bootstrap]);
  useEffect(() => {
    const handleLifeStyle = async () => {
      try {
        setIsVisible(true);
        const result = await userService.getLifeStyle();
        console.log('hahah ', result);
        setValue(
          result?.data?.smoking?.is_smoking == 'No'
            ? 2
            : result?.data?.smoking?.is_smoking == 'Yes'
            ? 0
            : result?.data?.smoking?.is_smoking == 'I used to'
            ? 1
            : 0
        );
        setDay(result?.data?.smoking?.stick_per_day);
        setStopSmoke(result?.data?.smoking?.smoking_stop_at);
        setStartSmoke(result?.data?.smoking?.smoking_start_at);
        // setIsSmoking(
        //   result?.data?.smoking?.is_smoking == 'No'
        //     ? 2
        //     : result?.data?.smoking?.is_smoking == 'Yes'
        //     ? 0
        //     : result?.data?.smoking?.is_smoking == 'I used to'
        //     ? 1
        //     : 0
        // );
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
    handleLifeStyle();
  }, []);
  const onSubmit = async () => {
    try {
      console.log('day', day);
      console.log('stopSmoke', stopSmoke);
      console.log('startSmoke', startSmoke);
      console.log('isSmoking yes no wala', value);
      if (value === 1) {
        setIsVisible(true);
        const response = await userService.Smoking(day, 0, startSmoke, value);
        console.log('smoking successful', response.data);
        navigate(SCREENS.EDIT_PROFILE);
        setIsVisible(false);
      } else if (value === 0) {
        setIsVisible(true);
        const response = await userService.Smoking(
          day,
          stopSmoke,
          startSmoke,
          value
        );
        console.log('smoking successful', response.data);
        navigate(SCREENS.EDIT_PROFILE);
        setIsVisible(false);
      } else {
        setIsVisible(true);
        const response = await userService.Smoking(0, 0, 0, value);
        console.log('smoking successful', response.data);
        navigate(SCREENS.EDIT_PROFILE);
        setIsVisible(false);
      }
    } catch (err) {
      setIsVisible(false);
      console.log(err);
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
                setValue(2);
              }}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == 2 ? colors.navyblue : null,
                },
              ]}
            >
              <RadioButton color={value == 2 ? colors.white : null} value={2} />
              <Text
                style={[
                  styles.radioText,
                  { color: value == 2 ? '#ffffff' : '#000000' },
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
                setValue(0);
              }}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == 0 ? colors.navyblue : null,
                },
              ]}
            >
              <RadioButton color={value == 0 ? colors.white : null} value={0} />
              <Text
                style={[
                  styles.radioText,
                  { color: value == 0 ? '#ffffff' : '#000000' },
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
                setValue(1);
              }}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == 1 ? colors.navyblue : null,
                },
              ]}
            >
              <RadioButton color={value == 1 ? colors.white : null} value={1} />
              <Text
                style={[
                  styles.radioText,
                  { color: value == 1 ? '#ffffff' : '#000000' },
                ]}
              >
                {
                  bootstrap?.attributes?.medical_template?.smoking[0]?.content
                    ?.fields[0]?.options[2]
                }
              </Text>
            </TouchableOpacity>
          </RadioButton.Group>

          {value !== 2 ? (
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
                {/* <Picker
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
                        style={{ color: colors.darkGray }}
                        key={index}
                        label={item.title}
                        value={item.title}
                      />
                    );
                  })}
                </Picker> */}
                <DropDown
                  mode={'flat'}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={startSmoke + ''}
                  setValue={(itemValue) => setStartSmoke(itemValue)}
                  list={options}
                  inputProps={{
                    style: {
                      width: '100%',
                      height: heightToDp(6),
                      flex: 1,
                      borderRadius: widthToDp(2),
                      maxHeight: heightToDp(6.5),
                    },
                    underlineColor: '#fff',
                  }}
                />
              </View>

              {value == 1 ? (
                <View>
                  <Text style={styles.label}>
                    {
                      bootstrap?.attributes?.medical_template?.smoking[0]
                        ?.content?.fields[3]?.question
                    }
                  </Text>
                  <View style={styles.container2}>
                    {/* <Picker
                      style={{ color: colors.black, fontFamily: fonts.regular }}
                      selectedValue={stopSmoke + ''}
                      onValueChange={(itemValue) => setStopSmoke(itemValue)}
                    >
                      {options2?.map((item, index) => {
                        return (
                          <Picker.Item
                            style={{ color: colors.darkGray }}
                            key={index}
                            label={item.title}
                            value={item.title}
                          />
                        );
                      })}
                    </Picker> */}
                    <DropDown
                      mode={'flat'}
                      visible={showDropDown2}
                      showDropDown={() => setShowDropDown2(true)}
                      onDismiss={() => setShowDropDown2(false)}
                      value={startSmoke + ''}
                      setValue={(itemValue) => setStopSmoke(itemValue)}
                      list={options2}
                      inputProps={{
                        style: {
                          width: '100%',
                          height: heightToDp(6),
                          flex: 1,
                          borderRadius: widthToDp(2),
                          maxHeight: heightToDp(6.5),
                        },
                        underlineColor: '#fff',
                      }}
                    />
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
