import React, { useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import { IAppState } from 'store/IAppState';
import { useSelector } from 'react-redux';

import { RadioButton } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import { ActivityIndicator } from 'components';
import { TextInputButton } from 'components';

import { GlobalColors } from 'utils/theme/global-colors';
import { userService } from 'services/user-service/user-service';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

import { styles } from './styles';

export default function VaccinationScreen() {
  const [value, setValue] = useState('first');
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
  }, [bootstrap]);

  const addTags = async () => {
    try {
      setIsVisible(true);
      const response = await userService.Vaccination(items);
      console.log('Vaccination successful', response);
      setList([...list, { id: list?.length + 1, title: items }]);
      setItems(!items);
      setIsVisible(false);
    } catch (err) {
      setIsVisible(false);
      console.log(err);
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
                    setValue(index);
                  }}
                  style={[
                    styles.radioContainer,
                    {
                      backgroundColor:
                        index == value ? GlobalColors.navyblue : null,
                    },
                  ]}
                >
                  <RadioButton
                    color={index == value ? GlobalColors.white : null}
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
                      color={GlobalColors.darkGray}
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
