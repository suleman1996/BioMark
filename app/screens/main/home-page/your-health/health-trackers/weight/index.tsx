import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { WeightChooser } from 'components/higher-order';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
} from 'components/base';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
// import { navigate } from 'services/nav-ref';
// import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';

import makeStyles from './styles';
import { ActivityIndicator } from 'components';
import {
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';

const Weight = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [value, setValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();
  const [validation, setValidation] = useState<any>(false);
  const [validation2, setValidation2] = useState<any>(false);
  const [selectedTypeWeight, setSelectedTypeWeight] = useState(1);

  useEffect(() => {
    let today = new Date();
    let dateTime =
      getMonth(today) +
      ' ' +
      getDay(today) +
      ', ' +
      getYear(today) +
      ' ' +
      getTime(today);
    setDateAndTime(dateTime);
  }, []);

  const onChangeText = (val) => {
    console.log(selectedTypeWeight, 'selectedTypeWeight');

    setValue(val);
    if ((val < 0 || val > 200) && selectedTypeWeight === 2) {
      setValidation(true);
      setValidation2(false);
    } else if ((val < 0 || val > 400) && selectedTypeWeight === 1) {
      setValidation(false);
      setValidation2(true);
    } else {
      setValidation(false);
      setValidation2(false);
    }
  };

  const onSubmit = async () => {
    let dateTime = '';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dateTime =
      getMonth(dateAndtime) +
      ' ' +
      getDay(dateAndtime) +
      ', ' +
      getYear(dateAndtime) +
      ' ' +
      getTime(dateAndtime);

    console.log('weight', value);
    // console.log('bp_diastolic', lowValue);
    console.log('date_entry', dateAndtime);
    try {
      setIsLoading(true);
      const response = await userService.createWeight({
        medical: {
          weight: value,
          is_metric: 'true',
          date_entry: dateAndtime,
        },
      });
      console.log('weight submitted ', response.data);
      alert('weight submitted ');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.errMsg.status === '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status === false) {
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
    <TitleWithBackWhiteBgLayout title="Weight">
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            // borderWidth: 5,
            marginBottom: heightToDp(25),
          }}
        >
          <WeightChooser
            height={15}
            label="Your Reading"
            textAlign="right"
            placeholder={'0.0'}
            onChangeText={onChangeText}
            value={value}
            selectedType={selectedTypeWeight}
            setSelectedType={setSelectedTypeWeight}
            setValue={setValue}
          />
          {validation ? (
            <Text style={styles.errorMessage}>
              Please enter a valid weight between 0 - 200 kg
            </Text>
          ) : null}
          {validation2 ? (
            <Text style={styles.errorMessage}>
              Please enter a valid weight between 0 - 400 lbs
            </Text>
          ) : null}

          {!validation && !validation2 && value ? (
            <>
              <Text style={styles.label}>Date - Time</Text>
              <DateTimePickerModal
                date={dateAndtime}
                setDate={(e: any) => setDateAndTime(e)}
              />
            </>
          ) : null}
        </View>

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={'Add'}
          disabled={validation || validation2 || !value ? true : false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default Weight;
