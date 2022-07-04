import React from 'react';

import { TouchableRipple, useTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

import BioBookTest from 'components/svg/bio-book-test';

import { navigate } from 'services/nav-ref';
import SCREENS from '../../navigation/constants/index';
import fonts from 'assets/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { addCovidBooking } from './../../store/covid/covid-actions';
import { IAppState } from 'store/IAppState';
import { useTranslation } from 'react-i18next';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { RFValue } from 'react-native-responsive-fontsize';

export default function BookTestButton() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state: IAppState) => state.profile?.userProfile
  );
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={styles.circleBtn}>
        <TouchableRipple
          onPress={() => {
            if (userDetails.id_verification) {
              navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                screen: SCREENS.BOOKCOVIDTEST,
              });
            } else {
              navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                screen: SCREENS.BOOKCOVIDTEST,
              });
              navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
                screen: SCREENS.ID_VERIFICATION_START,
                params: { sendTo: 'booktest' },
              });
            }

            dispatch(addCovidBooking([]));
          }}
          style={styles.btn}
          rippleColor={'rgba(0,128,128,0.05)'}
        >
          <BioBookTest width={7} height={7} />
        </TouchableRipple>
      </View>

      <View>
        <Text style={styles.healthText}>{t('pages.covid.home.bookTests')}</Text>
      </View>
    </View>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    circleBtn: {
      backgroundColor: 'white',
      borderRadius: 300,
      width: widthToDp(14),
      height: widthToDp(14),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 3,
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    healthText: {
      fontFamily: fonts.bold,
      fontSize: RFValue(15),
      color: colors.heading,
    },
    btn: {
      width: widthToDp(14),
      height: widthToDp(14),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
