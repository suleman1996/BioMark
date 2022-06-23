import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';

import DropDown from 'react-native-paper-dropdown';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import { ActivityIndicator } from 'components';

import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { userService } from 'services/user-service/user-service';
import { useSelector } from 'react-redux';

import makeStyles from './styles';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { useTranslation } from 'react-i18next';

const Sleep = () => {
  const isFocus = useIsFocused();
  const { t } = useTranslation();
  const sleepOptions = [
    { value: 0, label: 'less than 4 hours' },
    { value: 1, label: '4-7 hours' },
    { value: 2, label: '7-10 hours' },
    { value: 3, label: 'more than 10 hours' },
  ];
  const [selectedSleep, setSelectedSleep] = React.useState(
    sleepOptions[0]?.value
  );
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [isVisiable, setIsVisible] = React.useState(false);
  const [indexNumber, setIndex] = React.useState(0);
  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);
  const [showDropDown, setShowDropDown] = React.useState(false);

  React.useEffect(() => {
    handleLifeStyle();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus, bootstrap]);

  const handleSleep = async () => {
    try {
      setIsVisible(true);
      await userService.sleeping(indexNumber);

      navigate(SCREENS.EDIT_PROFILE);
      setIsVisible(false);
    } catch (error) {
      setIsVisible(false);

      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  const handleLifeStyle = async () => {
    try {
      setIsVisible(true);
      const result = await userService.getLifeStyle();

      result.data?.sleep?.sleep_duration == 'less than 4 hours' &&
        setSelectedSleep(sleepOptions[0].value);
      result.data?.sleep?.sleep_duration == '4-7 hours' &&
        setSelectedSleep(sleepOptions[1].value);
      result.data?.sleep?.sleep_duration == '7-10 hours' &&
        setSelectedSleep(sleepOptions[2].value);
      result.data?.sleep?.sleep_duration == 'more than 10 hours ' &&
        setSelectedSleep(sleepOptions[3].value);
      setIsVisible(false);
    } catch (error) {
      setIsVisible(false);

      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={isVisiable} />
      <TitleWithBackLayout title={t('pages.profile.links.sleep')}>
        <View style={styles.container}>
          <Text style={styles.heading}>
            {
              bootstrap?.attributes?.medical_template?.sleeping[0]?.content
                ?.fields[0]?.question
            }
          </Text>

          <View style={styles.container2}>
            {/* <Picker
                selectedValue={selectedSleep}
                style={{
                  color: colors.lightGrey,
                  fontFamily: fonts.regular,
                }}
                itemStyle={{ color: colors.danger }}
                onValueChange={(itemValue, index) => {
                  setSelectedSleep(itemValue), setIndex(index);
                }}
              >
                {sleepOptions?.map((item, index) => {
                  return (
                    <Picker.Item
                      color={selectedSleep == item.title && colors.blue}
                      key={index}
                      label={item.title}
                      value={item.title}
                    />
                  );
                })}
              </Picker> */}
            <DropDown
              mode={'flat'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={selectedSleep}
              setValue={(itemValue) => {
                setSelectedSleep(itemValue), setIndex(itemValue);
              }}
              list={sleepOptions}
              inputProps={{
                style: {
                  width: '100%',
                  height: heightToDp(6),
                  // flex: 1,
                  borderRadius: widthToDp(2),
                  maxHeight: heightToDp(6.5),
                },
                underlineColor: '#fff',
              }}
            />
          </View>
        </View>
        <ButtonWithShadowContainer
          onPress={() => handleSleep()}
          title={t('pages.medicalHistory.save')}
        />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
};

export default Sleep;
