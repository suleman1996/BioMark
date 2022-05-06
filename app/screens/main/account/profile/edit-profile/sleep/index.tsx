import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import styles from './styles';
import { navigate } from 'services/nav-ref';
import { Nav_Screens } from 'navigation/constants';
import colors from 'assets/colors';
import fonts from 'assets/fonts';
import { ActivityIndicator } from 'components';
import { userService } from 'services/user-service/user-service';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

const Sleep = () => {
  const isFocus = useIsFocused();
  const sleepOptions = [
    { title: 'less than 4 hours' },
    { title: '4-7 hours' },
    { title: '7-10 hours' },
    { title: 'more than 10 hours' },
  ];
  const [selectedSleep, setSelectedSleep] = React.useState(
    sleepOptions[0].title
  );
  const [isVisiable, setIsVisible] = React.useState(false);

  const handleSleep = async () => {
    try {
      setIsVisible(true);
      const result = await userService.sleeping(selectedSleep);
      console.log('Sleep success ', result.data);
      navigate(Nav_Screens.EditProfile);
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
      result.data?.sleep?.sleep_duration == 'more than 10 hours' &&
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

  React.useEffect(() => {
    handleLifeStyle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={isVisiable} />
      <TitleWithBackLayout title="Sleep">
        <View style={styles.container}>
          <Text style={styles.heading}>
            How many hours of sleep do you get per day?
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
                onValueChange={(itemValue) => setSelectedSleep(itemValue)}
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
