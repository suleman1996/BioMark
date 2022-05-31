import React, { useState, useRef } from 'react';
import { ScrollView, View, Text, Pressable, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';

import { HeightChooser, WeightChooser } from 'components/higher-order';
import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';

import makeStyles from './styles';
import { ActivityIndicator } from 'components/';

const BodyMeasurementScreen = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState(2);
  const [weightUnit, setWeightUnit] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<any>();

  const onChangeText = (values) => {
    heightUnit == '1'
      ? setHeight((values / 2.54).toFixed(4).toString())
      : setHeight(values);
    // setValue(value);
  };
  const onChangeText2 = (values) => {
    // setValue2(values);
    weightUnit == '1'
      ? setWeight((values * 2.2).toFixed(4).toString())
      : setWeight(values);
  };

  React.useEffect(() => {
    bodyMeasurements();
  }, []);

  const bodyMeasurements = async () => {
    try {
      setIsLoading(true);
      const result = await userService.getBodyMeasurements();
      console.log('body measurements ', result.data);
      result?.data?.height_attr
        ? setHeight(result?.data?.height_attr)
        : setHeight(0);
      result?.data?.weight_attr
        ? setWeight(result?.data?.weight_attr)
        : setWeight(0);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await userService.bodyMeasurement({
        medical: {
          height: height,
          weight: weight,
          is_metric: true,
        },
      });
      console.log('measurement successful', response.data);
      navigate(SCREENS.EDIT_PROFILE);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
    <TitleWithBackLayout title="Body Measurements">
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            // borderWidth: 5,
            marginBottom: heightToDp(37),
          }}
        >
          <HeightChooser
            height={15}
            label="Height"
            textAlign="right"
            placeholder={'0'}
            onChangeText={onChangeText}
            value={height}
            selectedType={heightUnit}
            setSelectedType={setHeightUnit}
            setValue={setHeight}
          />
          <WeightChooser
            height={15}
            label="Weight"
            textAlign="right"
            placeholder={'0.0'}
            onChangeText={onChangeText2}
            value={weight}
            selectedType={weightUnit}
            setSelectedType={setWeightUnit}
            setValue={setWeight}
          />

          <View
            style={{
              height: 100,
              backgroundColor: 'red',
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <TextInput
              placeholder="textinput...."
              placeholderTextColor="red"
              // onChangeText={onChangeText}
              // value={value}
              autoFocus={false}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              borderBottomWidth={0}
              keyboardType="numeric"
              style={{ backgroundColor: 'green', width: '80%' }}
            />
            <Menu ref={menuRef}>
              <MenuTrigger
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text
                  style={{
                    color: 'blue',
                    fontSize: responsiveFontSize(22),
                  }}
                >
                  hello
                </Text>

                <MaterialCommunityIcons
                  name="chevron-down"
                  size={responsiveFontSize(28)}
                  color="grey"
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: widthToDp(25),
                }}
              >
                <Pressable>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: responsiveFontSize(20),
                      padding: widthToDp(2),
                    }}
                  >
                    ft/in
                  </Text>
                </Pressable>
                <Pressable>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: responsiveFontSize(20),
                      padding: widthToDp(2),
                    }}
                  >
                    cm
                  </Text>
                </Pressable>
              </MenuOptions>
            </Menu>
          </View>
        </View>

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={'Save & Continue'}
          disabled={height == '' || weight == '' ? true : false}
        />
      </ScrollView>
    </TitleWithBackLayout>
  );
};

export default BodyMeasurementScreen;
