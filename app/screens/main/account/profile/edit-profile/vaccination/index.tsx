import {
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

import TitleWithBackLayout from 'components/layouts/back-with-title';
import ButtonWithShadowContainer from 'components/base/button-with-shadow-container';
import { GlobalColors } from 'utils/theme/global-colors';
import TextInput from 'components/text-input-button';
import { userService } from 'services/user-service/user-service';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { navigate } from 'services/nav-ref';
import { Nav_Screens } from 'navigation/constants';
import { styles } from './styles';

export default function VaccinationScreen() {
  const [value, setValue] = useState('first');
  const [items, setItems] = useState('');
  const [list, setList] = useState([]);
  const [refresh, setRefreh] = useState(false);
  const numColumns = 3;

  const onChangeInput = (text: any) => {
    setItems(text);
  };

  const addTags = async () => {
    try {
      const response = await userService.Vaccination(items);
      console.log('Vaccination successful', response);
      setList([...list, { id: list?.length + 1, title: items }]);
      setItems(!items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackLayout title="Vaccinations">
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <Text style={styles.label}>
            Have you been vaccinated as an adult?
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <TouchableOpacity
              onPress={() => setValue('first')}
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
                No
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue('second')}
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
                Yes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue('third')}
              style={[
                styles.radioContainer,
                {
                  backgroundColor:
                    value == 'third' ? GlobalColors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == 'third' ? GlobalColors.white : null}
                value="third"
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == 'third' ? '#ffffff' : '#000000' },
                ]}
              >
                Yes, but I'm not sure which vaccines
              </Text>
            </TouchableOpacity>
          </RadioButton.Group>

          {value == 'second' ? (
            <TextInput
              placeholder={undefined}
              onPress={addTags}
              value={items}
              onChangeText={onChangeInput}
              question="Please list the vaccines:"
            />
          ) : null}

          {value == 'second' ? (
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
        onPress={() => navigate(Nav_Screens.EditProfile)}
      />
    </SafeAreaView>
  );
}
