import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import Close from '../../assets/svgs/close';
// import GradientButton from 'components/linear-gradient-button';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleFitButton } from 'components/button';
import moment from 'moment';

const HealthRecordFilter = ({
  title,
  cancel,
  visible,
  cancelModal,
  closeModal,
  title2,
}) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const [checked, setChecked] = React.useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [endDate, setEndDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  //start date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    console.log('A date has been picked: ', date);
    setSelectedDate(date);
    hideDatePicker();
  };

  //end date picker
  const hideDatePicker2 = () => {
    setEndDatePickerVisibility(false);
  };
  const handleConfirm2 = (date) => {
    console.log('A date has been picked: ', date);
    setEndDate(date);
    hideDatePicker2();
  };
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>{title}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Close />
            </TouchableOpacity>
          </View>
          <Text style={styles.modaltitle2}>{title2}</Text>

          <TouchableOpacity
            style={styles.radioview}
            onPress={() => setChecked('first')}
          >
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
              color={colors.heading}
            />
            <Text style={styles.radiotext}>Uplaoded By Me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioview}
            onPress={() => setChecked('second')}
          >
            <RadioButton
              value="second"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')}
              color={colors.heading}
            />
            <Text style={styles.radiotext}>Sent By Doctor</Text>
          </TouchableOpacity>
          <Text style={styles.modalText2}>Start Date</Text>

          <Pressable style={styles.datepicker} onPress={showDatePicker}>
            <Text style={styles.datePickerText}>{`Date:  ${
              selectedDate
                ? moment(selectedDate).format('MM/DD/YYYY')
                : 'Please select date'
            }`}</Text>
            <Icon name="calendar-month-outline" size={30} />
          </Pressable>

          <Text style={styles.modalText2}>End Date</Text>
          <Pressable style={styles.datepicker} onPress={showEndDatePicker}>
            <Text style={styles.datePickerText}>{`Date:  ${
              endDate
                ? moment(selectedDate).format('MM/DD/YYYY')
                : 'Please select end date'
            }`}</Text>
            <Icon name="calendar-month-outline" size={30} />
          </Pressable>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm2}
            onCancel={hideDatePicker2}
          />
          <TouchableOpacity style={styles.gradientButton}>
            <GoogleFitButton
              disabled={false}
              title="Confirm"
              onPress={() => console.log('pressed')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clear}
            // onPress={() => alert('dkjfkjk')}
          >
            <Text style={styles.clearText}>Clear Filters</Text>
          </TouchableOpacity>

          {/* <GradientButton
            text="Yes"
            color={['#2C6CFC', '#2CBDFC']}
            style={styles.gradientButton}
            onPress={onPress}
          /> */}
          <TouchableOpacity style={styles.cancel} onPress={cancelModal}>
            <Text style={styles.cancelText}>{cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default HealthRecordFilter;
