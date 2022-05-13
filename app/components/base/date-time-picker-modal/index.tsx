import { Pressable, Text, View } from 'react-native';
import React, { useState } from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { logNow } from 'utils/functions/log-binder';
import { getDay, getMonth, getYear } from 'utils/functions/date-format';

import { styles } from './styles';

type Props = {
  date: any;
  setDate: any;
};

const DateTimePickerModalComponent = (props: Props) => {
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
        <Text style={styles.dateText}>{getMonth(date)}</Text>
        <View style={[styles.verticalLine, { flex: 1 }]}>
          <Text style={[styles.dateText]}>{getDay(date)}</Text>
        </View>
        <View style={[styles.verticalLine, { flex: 1 }]}>
          <Text style={styles.dateText}>{getYear(date)}</Text>
        </View>
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
