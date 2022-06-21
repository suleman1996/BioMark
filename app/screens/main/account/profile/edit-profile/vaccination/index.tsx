import React, { useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { IAppState } from 'store/IAppState';
import { useSelector } from 'react-redux';

import { RadioButton } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import { ActivityIndicator } from 'components';
import { TextInputButton } from 'components';
import { showMessage } from 'react-native-flash-message';

import { userService } from 'services/user-service/user-service';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';

export default function VaccinationScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = makeStyles(colors);

  const [value, setValue] = useState<any>(0);
  // const [condition, setCondition] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [vaccineList, setVaccineList] = useState([]);
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [isVisiable, setIsVisible] = React.useState(false);
  const [refresh, setRefreh] = useState(false);
  // const numColumns = 3;

  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);
  useEffect(() => {
    // console.log('Bootstrap =======>', bootstrap?.attributes?.medical_template);
    setVaccineList(
      bootstrap?.attributes?.medical_template.vaccine[0].content.fields[1]
        .options
    );
    getMedicalHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootstrap]);

  const addTags = () => {
    list.push(search.toString());
    setList([...list]);
    setSearch('');
    console.log('addList', list);
  };

  const onSubmit = async () => {
    try {
      setIsVisible(true);
      const response = await userService.Vaccination({
        medical_history: {
          has_condition: value,
          vaccine_list: list.toString(),
        },
      });
      console.log('response---------data', response.data);
      if (value === 1) {
        navigate(SCREENS.EDIT_PROFILE);
      } else if (value == 0) {
        navigate(SCREENS.EDIT_PROFILE);
      } else if (value == 2) {
        navigate(SCREENS.EDIT_PROFILE);
      } else {
        console.log('false');
      }
      setIsVisible(false);
    } catch (err) {
      setIsVisible(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (value == 1) {
      setShowSuggestion(true);
    }
  }, [value]);

  const getMedicalHistory = async () => {
    try {
      setIsVisible(true);
      const result = await userService.getMedicalHistory();
      console.log('resulttttt---------', result.data.vaccine);
      const array = (result?.data?.vaccine?.vaccine_list).split(',');
      setValue(
        result?.data?.vaccine?.has_condition == '1'
          ? 1
          : result?.data?.vaccine?.has_condition == '0'
          ? 0
          : result?.data?.vaccine?.has_condition == '2'
          ? 2
          : null
      );
      const filterEmptyValues = array.filter((element: any) => {
        return element !== '';
      });
      setList(filterEmptyValues);
      console.log('get_List', filterEmptyValues);

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
      <TitleWithBackLayout title={t('pages.profile.links.vaccination')}>
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>
            {
              bootstrap?.attributes?.medical_template?.vaccine[0]?.content
                ?.fields[0]?.question
            }
          </Text>
          {bootstrap?.attributes?.medical_template?.vaccine[0]?.content?.fields[0]?.options.map(
            (item, index: number) => (
              <RadioButton.Group
                onValueChange={(newValue) => {
                  setValue(newValue);
                }}
                value={value}
              >
                <TouchableOpacity
                  onPress={() => {
                    setValue(index);
                    // setCondition(
                    //   index == 0
                    //     ? 'nooo'
                    //     : // : index == 1
                    //       // ? 'true'
                    //       // : index == 2
                    //       // ? 'false'
                    //       // null
                    // );
                    // console.log(index, 'items');
                    index == 0 ? setList('') : index == 2 ? setList('') : null;
                    console.log(index, 'value------');
                  }}
                  style={[
                    styles.radioContainer,
                    {
                      backgroundColor: index == value ? colors.navyblue : null,
                    },
                  ]}
                >
                  <RadioButton
                    color={index == value ? colors.white : null}
                    value={index}
                  />
                  <Text
                    style={[
                      styles.radioText,
                      { color: index == value ? '#ffffff' : '#000000' },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              </RadioButton.Group>
            )
          )}

          {value == 1 ? (
            <TextInputButton
              placeholder={undefined}
              onPress={addTags}
              value={search}
              disabled={!search ? true : false}
              onChangeText={(text: any) => {
                setSearch(text);
                setShowSuggestion(true);
              }}
              question="Please list the vaccines:"
            />
          ) : null}
          {showSuggestion && value == 1 ? (
            <View style={styles.flatlistView}>
              {!search ? null : (
                <FlatList
                  data={vaccineList.filter((item) => item.includes(search))}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            setSearch(item);
                            setShowSuggestion(false);
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: 'white',
                            }}
                          >
                            <Text
                              style={{
                                flex: 1,
                                color: 'black',
                                padding: 10,
                              }}
                            >
                              {item}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    );
                  }}
                />
              )}
            </View>
          ) : null}

          {value == 1 ? (
            <View
              style={{
                marginHorizontal: 30,
                marginTop: 20,
              }}
            >
              <FlatList
                data={list}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                // key={list.length}
                extraData={refresh}
                columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <TouchableOpacity
                        style={styles.listview}
                        onPress={() => {
                          list.splice(index, 1), setRefreh(!refresh);
                        }}
                      >
                        <Text style={styles.listTextColor}>{item}</Text>
                        <Entypo
                          name={'cross'}
                          size={responsiveFontSize(15)}
                          color={colors.darkGray}
                          style={styles.crossIcon}
                        />
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            </View>
          ) : null}
        </ScrollView>
      </TitleWithBackLayout>
      <ButtonWithShadowContainer
        title={t('pages.medicalHistory.save')}
        onPress={() => onSubmit()}
      />
    </SafeAreaView>
  );
}
