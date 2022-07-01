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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { TextInput } from 'components';

import { userService } from 'services/user-service/user-service';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';

import { options } from './year';
import makeStyles from './styles';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { NUMERIC_REGIX } from 'utils/regix';
import { useTranslation } from 'react-i18next';

export default function SmokingScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = makeStyles(colors);
  const navigation = useNavigation();

  const [value, setValue] = useState(2);
  const [day, setDay] = useState();
  const [stopSmoke, setStopSmoke] = useState('');
  const [startSmoke, setStartSmoke] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);
  const options2 = [
    { label: '1990', value: '1990' },
    { label: '1991', value: '1991' },
    { label: '1992', value: '1992' },
    { label: '1993', value: '1993' },
    { label: '1994', value: '1994' },
    { label: '1995', value: '1995' },
    { label: '1996', value: '1996' },
    { label: '1997', value: '1997' },
    { label: '1998', value: '1998' },
    { label: '1999', value: '1999' },
    { label: '2000', value: '2000' },
    { label: '2001', value: '2001' },
    { label: '2002', value: '2002' },
    { label: '2003', value: '2003' },
    { label: '2004', value: '2004' },
    { label: '2005', value: '2005' },
    { label: '2006', value: '2006' },
    { label: '2007', value: '2007' },
    { label: '2008', value: '2008' },
    { label: '2009', value: '2009' },
    { label: '2010', value: '2010' },
    { label: '2011', value: '2011' },
    { label: '2012', value: '2012' },
    { label: '2013', value: '2013' },
    { label: '2014', value: '2014' },
    { label: '2015', value: '2015' },
    { label: '2016', value: '2016' },
    { label: '2017', value: '2017' },
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
  ];
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [showDropDown2, setShowDropDown2] = React.useState(false);
  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);

  const isFocus = useIsFocused();

  useEffect(() => {
    //  handleLifeStyle();
  }, [isFocus, bootstrap]);

  useEffect(() => {
    const handleLifeStyle = async () => {
      try {
        setIsVisible(true);
        const result = await userService.getLifeStyle();

        setValue(
          result?.data?.smoking?.is_smoking == 'No'
            ? 2
            : result?.data?.smoking?.is_smoking == 'Yes'
            ? 0
            : result?.data?.smoking?.is_smoking == 'I used to'
            ? 1
            : 0
        );
        if (result?.data?.smoking?.stick_per_day == null) {
          setDay('');
        } else {
          setDay('' + result?.data?.smoking?.stick_per_day);
        }

        setStopSmoke(result?.data?.smoking?.smoking_stop_at);
        setStartSmoke(result?.data?.smoking?.smoking_start_at);

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
      if (value === 0) {
        setIsVisible(true);
        await userService.Smoking(+(day || 0), 0, startSmoke, value);

        navigation.goBack();
        setIsVisible(false);
      } else if (value === 1) {
        setIsVisible(true);
        await userService.Smoking(day, stopSmoke, startSmoke, value);

        navigation.goBack();
        setIsVisible(false);
      } else {
        setIsVisible(true);
        await userService.Smoking(0, 0, 0, value);

        navigation.goBack();
        setIsVisible(false);
      }
    } catch (err) {
      setIsVisible(false);
      console.error(err);
    }
  };
  const onChangedSmoke = (text) => {
    if (NUMERIC_REGIX.test(text) || text == '') {
      setDay(text);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={isVisiable} />
      <TitleWithBackLayout title={t('pages.profile.links.smoking')}>
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
              <RadioButton.Android
                color={value == 2 ? colors.white : null}
                value={2}
              />
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
              <RadioButton.Android
                color={value == 0 ? colors.white : null}
                value={0}
              />
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
              <RadioButton.Android
                color={value == 1 ? colors.white : null}
                value={1}
              />
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
                  value={day || ''}
                  // defaultValue={'hello'}
                  onChange={(text) => onChangedSmoke(text)}
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
                    <DropDown
                      mode={'flat'}
                      visible={showDropDown2}
                      showDropDown={() => setShowDropDown2(true)}
                      onDismiss={() => setShowDropDown2(false)}
                      value={stopSmoke + ''}
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
        <ButtonWithShadowContainer
          title={t('pages.medicalHistory.save')}
          onPress={onSubmit}
        />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}
