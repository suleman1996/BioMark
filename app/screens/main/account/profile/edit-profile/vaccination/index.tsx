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

export default function VaccinationScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [value, setValue] = useState('');
  const [condition, setCondition] = useState('');
  const [items, setItems] = useState('');
  const [list, setList] = useState([]);
  const [isVisiable, setIsVisible] = React.useState(false);
  const [refresh, setRefreh] = useState(false);

  const numColumns = 3;

  const onChangeInput = (text: any) => {
    setItems(text);
  };

  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);
  useEffect(() => {
    console.log('Bootstrap =======>', bootstrap?.attributes?.medical_template);
    getMedicalHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootstrap]);

  const addTags = async () => {
    try {
      setIsVisible(true);
      const response = await userService.Vaccination(items, condition);
      console.log('Vaccination successful', response);
      setList([...list, { id: list?.length + 1, title: items }]);
      setItems(!items);
      setIsVisible(false);
    } catch (err) {
      setIsVisible(false);
      console.log(err);
    }
  };

  const getMedicalHistory = async () => {
    try {
      setIsVisible(true);
      const result = await userService.getMedicalHistory();
      console.log('resulttttt', result.data.vaccine);
      // setValue(
      //   result?.data?.vaccine?.has_condition == '1'
      //     ? 'true'
      //     : result?.data?.vaccine?.has_condition == '0'
      //     ? 'false'
      //     : result?.data?.vaccine?.has_condition == '2'
      //     ? 'false'
      //     : null
      // );
      console.log('conditionlist', result?.data?.vaccine);
      // setItems(result?.data?.vaccine?.vaccine_list);
      setList([
        ...list,
        { id: list?.length + 1, title: result?.data?.vaccine?.vaccine_list },
      ]);
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
      <TitleWithBackLayout title="Vaccinations">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>
            {
              bootstrap?.attributes?.medical_template?.vaccine[0]?.content
                ?.fields[0]?.question
            }
          </Text>
          {bootstrap?.attributes?.medical_template?.vaccine[0]?.content?.fields[0]?.options.map(
            (item, index) => (
              <RadioButton.Group
                onValueChange={(newValue) => {
                  setValue(newValue);
                }}
                value={value}
              >
                <TouchableOpacity
                  onPress={() => {
                    setValue(index),
                      setCondition(
                        index == 0
                          ? 'nooo'
                          : // : index == 1
                            // ? 'true'
                            // : index == 2
                            // ? 'false'
                            null
                      );
                    // console.log(index, 'items');
                    console.log(condition, 'value------');
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
              value={items}
              disabled={!items ? true : false}
              onChangeText={onChangeInput}
              question="Please list the vaccines:"
            />
          ) : null}

          {value == 1 ? (
            <View style={styles.flatlistView}>
              <FlatList
                // horizontal
                data={list}
                numColumns={numColumns}
                extraData={refresh}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  // <>
                  // {items ?
                  //   <TouchableOpacity
                  //   style={styles.listview}
                  //   onPress={() => {
                  //     list.splice(index, 1), setRefreh(!refresh);
                  //   }}>
                  // <Text style={{color:'red'}}>{item}</Text>
                  // </TouchableOpacity>
                  // :null}
                  // </>
                  <TouchableOpacity
                    style={styles.listview}
                    onPress={() => {
                      list.splice(index, 1), setRefreh(!refresh);
                    }}
                  >
                    <Text style={styles.listTextColor} key={item}>
                      {item.title}
                    </Text>
                    <Entypo
                      name={'cross'}
                      size={responsiveFontSize(15)}
                      color={colors.darkGray}
                      style={styles.crossIcon}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : null}
        </ScrollView>
      </TitleWithBackLayout>
      <ButtonWithShadowContainer
        title="Save"
        onPress={() => navigate(SCREENS.EDIT_PROFILE)}
      />
    </SafeAreaView>
  );
}
