import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import colors from 'assets/colors';

type Props = {
  width: any;
  date: any;
  setDate: any;
  isPickerShow: boolean;
  setIsPickerShow: any;
};

const DatePicker = (props: Props) => {
  const { width, date, setDate, isPickerShow, setIsPickerShow } = props;
  let otherStyles = [];

  if (width) {
    otherStyles.push({ width: width });
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setIsPickerShow(true);
      }}
      style={[styles.container, otherStyles, { width: width ? width : '90%' }]}
    >
      {isPickerShow && (
        <DateTimePicker
          style={[styles.datePickerStyle]}
          mode="date"
          display={Platform.OS === 'ios' ? 'default' : 'default'}
          value={new Date(date)}
          minimumDate={new Date(1950, 0, 1)}
          maximumDate={new Date()}
          onChange={(date) => {
            setIsPickerShow(false),
              date.type == 'set' &&
                setDate(moment(date.nativeEvent.timestamp).format('L'));
          }}
        />
      )}
      <Text style={{ marginLeft: 15, color: colors.placeHolder }}>
        {moment(date).format('MM/DD/YYYY')}
      </Text>
    </TouchableOpacity>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.inputBg,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    height: 44,
    backgroundColor: colors.inputBg,
  },
  datePickerStyle: {
    alignSelf: 'center',
    width: '100%',
  },
});
