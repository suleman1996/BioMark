import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import { ActivityIndicator } from 'components';

import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { userService } from 'services/user-service/user-service';
import { useSelector } from 'react-redux';

import fonts from 'assets/fonts';

import makeStyles from './styles';

const Sleep = () => {
  const isFocus = useIsFocused();
  const sleepOptions = [
    { id: 0, title: 'less than 4 hours' },
    { id: 1, title: '4-7 hours' },
    { id: 2, title: '7-10 hours' },
    { id: 3, title: 'more than 10 hours' },
  ];
  const [selectedSleep, setSelectedSleep] = React.useState(
    sleepOptions[0].title
  );
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [isVisiable, setIsVisible] = React.useState(false);
  const [indexNumber, setIndex] = React.useState(0);
  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);

  React.useEffect(() => {
    handleLifeStyle();
    console.log(bootstrap, 'bootstrapppppp');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus, bootstrap]);

  const handleSleep = async () => {
    try {
      setIsVisible(true);
      const result = await userService.sleeping(indexNumber);
      console.log('Sleep success ', result.data);
      navigate(SCREENS.EDIT_PROFILE);
      setIsVisible(false);
    } catch (error) {
      setIsVisible(false);
      console.log('Api error ', error);

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
      console.log('lifeStyle success ', result.data);
      result.data?.sleep?.sleep_duration == 'less than 4 hours' &&
        setSelectedSleep(sleepOptions[0].title);
      result.data?.sleep?.sleep_duration == '4-7 hours' &&
        setSelectedSleep(sleepOptions[1].title);
      result.data?.sleep?.sleep_duration == '7-10 hours' &&
        setSelectedSleep(sleepOptions[2].title);
      result.data?.sleep?.sleep_duration == 'more than 10 hours ' &&
        setSelectedSleep(sleepOptions[3].title);
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
      <TitleWithBackLayout title="Sleep">
        <View style={styles.container}>
          <Text style={styles.heading}>
            {
              bootstrap?.attributes?.medical_template?.sleeping[0]?.content
                ?.fields[0]?.question
            }
          </Text>
          <View>
            <View style={styles.container2}>
              <Picker
                selectedValue={selectedSleep}
                style={{
                  color: colors.placeHolder,
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
              </Picker>
            </View>
          </View>
        </View>
        <ButtonWithShadowContainer onPress={() => handleSleep()} title="Save" />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
};

export default Sleep;
