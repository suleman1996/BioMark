import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const App = (props: { width: any; }) => {
  const {width} = props;
  let otherStyles = [];

  if (width) {
    otherStyles.push({width: width});
  }
  const [date, setDate] = useState(new Date());

  return (
    <SafeAreaView>
      <View style={[styles.container, otherStyles]}>
        <DatePicker
          style={styles.datePickerStyle}
          mode="date"
          placeholder={date.toISOString()}
          date={date}
          format="DD-MM-YYYY"
          minDate="01-01-1950"
          maxDate={new Date()}
          confirmBtnText="Done"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {display: 'none'},
            dateInput: {
              borderWidth: 0,
            },
            placeholderText: {
              fontSize: 15,
              fontFamily: fonts.regular,
              color: '#8493AE',
            },
            dateText: {
              color: '#8793AE',
              fontFamily: fonts.regular,
              fontSize: 16,
              letterSpacing: 5,
            },
          }}
          onDateChange={(date: any) => {
            setDate(date);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // marginHorizontal: 15,
    // backgroundColor: colors.whiteColor,
    borderBottomColor: colors.inputBg,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    height: 44,
    width: '90%',
    backgroundColor: colors.inputBg,
  },
  datePickerStyle: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: '100%',
  },
});
