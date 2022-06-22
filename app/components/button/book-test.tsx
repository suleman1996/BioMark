import React from 'react';

import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BioBookTest from 'components/svg/bio-book-test';

import { navigate } from 'services/nav-ref';
import SCREENS from '../../navigation/constants/index';
import fonts from 'assets/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { addCovidBooking } from './../../store/covid/covid-actions';
import { IAppState } from 'store/IAppState';

export default function BookTestButton() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state: IAppState) => state.profile?.userProfile
  );
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity activeOpacity={0.6}>
        <TouchableOpacity
          onPress={() => {
            if (userDetails.id_verification) {
              navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                screen: SCREENS.BOOKCOVIDTEST,
              });
            } else {
              navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
                screen: SCREENS.ID_VERIFICATION_START,
                params: { sendTo: 'booktest' },
              });
            }

            dispatch(addCovidBooking([]));
          }}
          activeOpacity={0.6}
          style={styles.circleBtn}
        >
          <BioBookTest width={7} height={7} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View>
        <Text style={styles.healthText}>Book Tests</Text>
      </View>
    </View>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    circleBtn: {
      backgroundColor: 'white',
      borderRadius: 300,
      paddingHorizontal: 15,
      paddingVertical: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 10,
      marginBottom: 5,
    },
    healthText: {
      fontFamily: fonts.bold,
      fontSize: 15,
      color: colors.heading,
    },
  });
