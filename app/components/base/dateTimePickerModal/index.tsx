import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import colors from 'assets/colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { logNow } from 'utils/functions/log-binder';
import { dateFormat } from 'utils/functions/dateFormat';
type Props = {
  date: any;
  setDate: any;
};

const DateTimePickerModalComponent = (props: Props) => {
  const { date, setDate } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //   const showDatePicker = () => {
  //     setDatePickerVisibility(true);
  //   };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dated: any) => {
    logNow(date);
    console.warn('A date has been picked: ', dated);
    setDate(dated);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setDatePickerVisibility(true)}
        style={styles.textContainer}
      >
        <Text style={styles.dateText}>{dateFormat(date)}</Text>
        {/* <Text style={styles.dateText}>January</Text>
        <View style={[styles.verticalLine, { flex: 1 }]}>
          <Text style={[styles.dateText]}>01</Text>
        </View>
        <View style={[styles.verticalLine, { flex: 1 }]}>
          <Text style={styles.dateText}>1990</Text>
        </View> */}
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(value) => handleConfirm(value.toISOString())}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateTimePickerModalComponent;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.inputBg,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: widthToDp(3),
    height: heightToDp(6),
    backgroundColor: colors.inputBg,
    width: '100%',
  },
  textContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: widthToDp(3),
  },
  dateText: {
    fontFamily: GlobalFonts.light,
    color: GlobalColors.black,
    fontSize: responsiveFontSize(18),
    flex: 1,
    textAlign: 'center',
  },
  verticalLine: {
    height: heightToDp(4),
    borderLeftWidth: 1,
    borderLeftColor: GlobalColors.darkGray,
    width: widthToDp(1),
  },
});
