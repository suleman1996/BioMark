import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { makeStyles } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import InfoModal from 'components/info-modal';
type Props = { icon: boolean };

const SuggestionsText = (props: Props) => {
  const { icon } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>What appointment will be shown?</Text>
      {icon ? (
        <Icon
          name="ios-information-circle-outline"
          size={responsiveFontSize(22)}
          onPress={() => setShowModal(true)}
        />
      ) : null}
      <InfoModal
        text="Okay"
        visible={showModal}
        title="What appointment will be shown?"
        text2="Currently, only appointments for COVID-19 Test Bookings will be shown here, in a future update we will collate all events here. Stay tuned!"
        color={['#1996D6', '#1996D6']}
        onPress={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default SuggestionsText;
