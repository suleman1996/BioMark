import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { BloodSugarChooser } from 'components/higher-order';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
  DropdownMenu,
} from 'components/base';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';

import makeStyles from './styles';
import { ActivityIndicator } from 'components';
const options = [
  { value: '---', label: '---' },
  { value: 'Caucasian', label: 'Caucasian' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Filpino', label: 'Filpino' },
  { value: 'Indian', label: 'Indian' },
  { value: 'Malay', label: 'Malay' },
  { value: 'Other / NA', label: 'Other / NA' },
];
const BloodSugar = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [selectedType, setSelectedType] = useState(1);
  //const [selectedTypeWeight, setSelectedTypeWeight] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const [dropdownValue, setDropdown] = useState<any>();
  const [isDropdownChanged, setIsDropDownChanged] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();

  const onChangeText = (values) => {
    selectedType == '1'
      ? setValue((values / 2.54).toFixed(4).toString())
      : setValue(values);
    // setValue(value);
  };

  React.useEffect(() => {
    bodyMeasurements();
  }, []);

  const bodyMeasurements = async () => {
    try {
      setIsLoading(true);
      const result = await userService.getBodyMeasurements();
      console.log('body measurements ', result.data);
      result?.data?.height_attr
        ? setValue(result?.data?.height_attr)
        : setValue(0);
      result?.data?.weight_attr
        ? setValue2(result?.data?.weight_attr)
        : setValue2(0);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await userService.bodyMeasurement({
        medical: {
          height: value,
          weight: value2,
          is_metric: true,
        },
      });
      console.log('measurement successful', response.data);
      navigate(SCREENS.EDIT_PROFILE);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
    <TitleWithBackWhiteBgLayout title="Blood Sugar">
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            // borderWidth: 5,
            marginBottom: heightToDp(37),
          }}
        >
          <BloodSugarChooser
            width={'70%'}
            height={15}
            label="Your Reading"
            textAlign="right"
            placeholder={'0'}
            onChangeText={onChangeText}
            value={value}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setValue={setValue}
          />
          <View style={styles.dropDown}>
            <Text style={styles.textStyle}>Meal</Text>
            <DropdownMenu
              options={options}
              selectedValue={dropdownValue}
              onValueChange={(text: any) => {
                setDropdown(text);
                setIsDropDownChanged(true);
              }}
              error={
                isDropdownChanged
                  ? dropdownValue === '---'
                    ? 'Please select your ethnicity'
                    : ''
                  : ''
              }
            />
          </View>
          <Text style={styles.label}>Date of Birth</Text>
          <DateTimePickerModal
            date={dateAndtime}
            setDate={(e: any) => setDateAndTime(e)}
          />
        </View>

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={'Save & Continue'}
          disabled={value == '' || value2 == '' ? true : false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default BloodSugar;
