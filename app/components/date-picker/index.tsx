import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Platform} from 'react-native';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
import {} from 'react-native-gesture-handler';
import moment from 'moment';

const App = (props: {
  width: any;
  date: any;
  setDate: any;
  isPickerShow: boolean;
  setIsPickerShow: any;
}) => {
  const {width, date, setDate, isPickerShow, setIsPickerShow} = props;
  let otherStyles = [];

  if (width) {
    otherStyles.push({width: width});
  }
  // const [date, setDate] = useState(new Date());

  return (
    <TouchableOpacity
      onPress={() => {
        setIsPickerShow(true), console.log('xxx Date ', date);
      }}
      style={[styles.container, otherStyles, {width: width ? width : '90%'}]}>
      {isPickerShow && (
        <DateTimePicker
          style={[styles.datePickerStyle]}
          mode="date"
          display={Platform.OS === 'ios' ? 'default' : 'default'}
          value={new Date(date)}
          minimumDate={new Date(1950, 0, 1)}
          maximumDate={new Date()}
          onChange={date => {
            console.log(date),
              setIsPickerShow(false),
              date.type == 'set' &&
                setDate(moment(date.nativeEvent.timestamp).format('L'));
          }}
        />
      )}
      <Text style={{marginLeft: 15, color: colors.placeHolder}}>
        {moment(date).format('MM/DD/YYYY')}
      </Text>
    </TouchableOpacity>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.inputBg,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    height: 44,
    // width: '90%',
    backgroundColor: colors.inputBg,
  },
  datePickerStyle: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: '100%',
  },
});
