import { Pressable, Text, View, Platform } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { logNow } from 'utils/functions/log-binder';
import {
  getDay,
  getMonth,
  getYear,
  getTime,
} from 'utils/functions/date-format';

import makeStyles from './styles';

type Props = {
  date: any;
  setDate: any;
  maxDate?: Date;
};

const DateTimePickerModalComponent = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { date, setDate } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dated: any) => {
    logNow(date);
    setDate(dated);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setDatePickerVisibility(true)}
        style={styles.textContainer}
      >
        <Text style={[styles.dateText]}>
          {getMonth(date)} {getDay(date)}, {getYear(date)} - {getTime(date)}
        </Text>
        <Icon
          name="calendar-month-outline"
          size={30}
          color={colors.placeholder}
        />
      </Pressable>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
        {...(props.maxDate && { maximumDate: new Date(props.maxDate) })}
        onConfirm={(value) => handleConfirm(value.toISOString())}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateTimePickerModalComponent;
