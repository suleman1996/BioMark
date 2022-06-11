import { Modal } from 'components/base';
import SCREENS from 'navigation/constants';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { navigate } from '../../../services/nav-ref';
import makeStyles from './styles';

type Props = {
  setIsVisible: any;
  isVisible: boolean;
  isDependant: boolean;
  name: string;
  code: string;
};

const HealthDeclartionCompleted = (props: Props) => {
  const { setIsVisible, isVisible, isDependant, name, code } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // 3. Generate QRCode

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <AntDesign
          name="checkcircle"
          color={colors.primary}
          size={responsiveFontSize(90)}
        />
        <Text style={styles.title}>Health Declaration Complete!</Text>
        <Text style={styles.desc}>
          Thank you for completing the declaration, do be ready at the test
          location for your stipulated test slot.
        </Text>
        {isDependant ? (
          <Text style={styles.desc2}>Your Depandant(s) Booking ID(s)</Text>
        ) : (
          <Text style={[styles.desc, { fontSize: responsiveFontSize(22) }]}>
            Your Booking ID: <Text style={styles.desc2}>{code}</Text>
          </Text>
        )}

        {isDependant ? (
          <Text style={[styles.desc, { fontSize: responsiveFontSize(22) }]}>
            {name}: <Text style={styles.desc2}>{code}</Text>
          </Text>
        ) : null}

        <View style={styles.bottom2Btns}>
          <Pressable
            onPress={() => {
              navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                screen: SCREENS.COVID19BOOKINGS,
              });
              setIsVisible(false);
            }}
            style={styles.btnEnable}
          >
            <Text style={[styles.btnText2]}>View Bookings</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate(SCREENS.MAIN_NAVIGATOR, {
                screen: SCREENS.HOME,
              });
              setIsVisible(false);
            }}
            style={[styles.btn, { backgroundColor: colors.lightBlue }]}
          >
            <Text style={[styles.btnText]}>Return to Homepage</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default HealthDeclartionCompleted;
