import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import Close from '../../assets/svgs/close';

import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleFitButton } from 'components/button';
import { useTranslation } from 'react-i18next';

const HealthRecordFilter = ({
  title,
  cancel,
  visible,
  cancelModal,
  closeModal,
  title2,
  firstValue,
  secondValue,
  touchableRadio1,
  touchableRadio2,
  status,
  onPressRadio1,
  status2,
  onPressRadio2,
  startDateText,
  endDateText,
  handleConfirm,
  handleConfirm2,
  onPressClearFilter,
  onConifrm,
  cancelDatePicker,
  showDatePicker,
  isDatePickerVisible,
  showEndDatePicker,
  cancelEndDatePicker,
  isEndDatePickerVisible,
  onModalClose,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = Styles(colors);

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <Pressable style={styles.centeredView} onPress={onModalClose}>
        <View style={styles.modalView}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>{title}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Close />
            </TouchableOpacity>
          </View>
          <Text style={styles.modaltitle2}>{title2}</Text>

          <TouchableOpacity style={styles.radioview} onPress={touchableRadio1}>
            <RadioButton.Android
              value={firstValue}
              status={status}
              onPress={onPressRadio1}
              color={colors.heading}
            />
            <Text style={styles.radiotext}>
              {t('pages.results.filters.uploadedByMe')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioview} onPress={touchableRadio2}>
            <RadioButton.Android
              value={secondValue}
              status={status2}
              onPress={onPressRadio2}
              color={colors.heading}
            />
            <Text style={styles.radiotext}>
              {t('pages.results.filters.sentByDoctor')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.modalText2}>
            {t('pages.results.filters.startDate')}
          </Text>

          <Pressable style={styles.datepicker} onPress={showDatePicker}>
            <Text style={styles.datePickerText}>{startDateText}</Text>
            <Icon name="calendar-month-outline" size={30} />
          </Pressable>

          <Text style={styles.modalText2}>
            {t('pages.results.filters.endDate')}
          </Text>
          <Pressable style={styles.datepicker} onPress={showEndDatePicker}>
            <Text style={styles.datePickerText}>{endDateText}</Text>
            <Icon name="calendar-month-outline" size={30} />
          </Pressable>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={cancelDatePicker}
          />

          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm2}
            onCancel={cancelEndDatePicker}
          />
          <TouchableOpacity style={styles.gradientButton}>
            <GoogleFitButton
              disabled={false}
              title={t('pages.results.filters.confirm')}
              onPress={onConifrm}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.clear} onPress={onPressClearFilter}>
            <Text style={styles.clearText}>
              {t('pages.results.filters.clearFilters')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancel} onPress={cancelModal}>
            <Text style={styles.cancelText}>{cancel}</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};
export default HealthRecordFilter;
