import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import TitleWithBackLayout from 'components/layouts/back-with-title';
import styles from './styles';
import { GlobalColors } from 'utils/theme/global-colors';
import ButtonWithShadowContainer from 'components/base/button-with-shadow-container';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { navigate } from 'services/nav-ref';
import { Nav_Screens } from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';
import ActivityIndicator from 'components/loader/activity-indicator';
import { userService } from 'services/user-service/user-service';
import { useIsFocused } from '@react-navigation/native';

type RenderDrinkingProps = {
  title: string;
  quantity: number;
  setter: (value: number) => void;
  iconLeft: React.ReactNode;
  Add: React.ReactNode;
  Minus: React.ReactNode;
};

const Drinking = () => {
  const isFocus = useIsFocused();

  const [value, setValue] = React.useState('');
  const [beer, setBeer] = React.useState(0);
  const [wine, setWine] = React.useState(0);
  const [spirits, setSpiritss] = React.useState(0);
  const [isVisiable, setIsVisible] = React.useState(false);
  const [isDrinking, setIsDrinking] = React.useState(false);

  const handleDrinking = async () => {
    if (value == '') {
      showMessage({
        message: 'Please select value',
        type: 'danger',
      });
    } else {
      try {
        setIsVisible(true);
        const result = await userService.drinking(
          isDrinking,
          beer,
          wine,
          spirits
        );
        console.log('Drinking success ', result.data);
        navigate(Nav_Screens.EditProfile);

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
    }
  };

  const handleLifeStyle = async () => {
    try {
      setIsVisible(true);
      const result = await userService.getLifeStyle();
      setValue(result?.data?.drinking?.is_drinking ? 'second' : 'first');
      setBeer(result?.data?.drinking?.pints_of_beer);
      setWine(result?.data?.drinking?.glasses_of_wine);
      setSpiritss(result?.data?.drinking?.shots_of_spirits);
      setIsDrinking(result?.data?.drinking?.is_drinking ? true : false);
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

  const RenderDrinking = (props: RenderDrinkingProps) => (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ffffff50',
      }}
    >
      <View
        style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}
      >
        <View style={{ width: 40, alignItems: 'center' }}>
          {props.iconLeft}
        </View>

        <Text
          style={{
            color: GlobalColors.darkPrimary,
            fontFamily: GlobalFonts.light,
          }}
        >
          {props.title}
        </Text>
      </View>
      <View
        style={{
          width: '50%',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={() => props.quantity > 0 && props.setter(props.quantity - 1)}
          style={{ marginRight: 10 }}
        >
          {props.Minus}
        </TouchableOpacity>
        <Text>{props.quantity}</Text>
        <TouchableOpacity
          onPress={() => props.setter(props.quantity + 1)}
          style={{ marginLeft: 10 }}
        >
          {props.Add}
        </TouchableOpacity>
      </View>
    </View>
  );

  React.useEffect(() => {
    handleLifeStyle();
  }, [isFocus]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={isVisiable} />
      <TitleWithBackLayout title="Drinking">
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <ScrollView style={{ flex: 1, marginBottom: 100 }}>
            <Text style={styles.label}>Do you drink alcoholic beverages.?</Text>
            <RadioButton.Group
              onValueChange={(newValue) => {
                setValue(newValue);
                newValue == 'first'
                  ? (setBeer(0),
                    setWine(0),
                    setSpiritss(0),
                    setIsDrinking(false))
                  : setIsDrinking(true);
              }}
              value={value}
            >
              <TouchableOpacity
                onPress={() => {
                  setValue('first'),
                    setBeer(0),
                    setWine(0),
                    setSpiritss(0),
                    setIsDrinking(false);
                }}
                style={[
                  styles.radioContainer,
                  { backgroundColor: value === 'first' ? '#054E8B' : null },
                ]}
              >
                <RadioButton
                  color={value == 'first' ? GlobalColors.white : null}
                  value="first"
                />
                <Text
                  style={[
                    styles.radioText,
                    { color: value == 'first' ? '#ffffff' : '#000000' },
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setValue('second'), setIsDrinking(true);
                }}
                style={[
                  styles.radioContainer,
                  { backgroundColor: value == 'second' ? '#054E8B' : null },
                ]}
              >
                <RadioButton
                  color={value == 'second' ? GlobalColors.white : null}
                  value="second"
                />
                <Text
                  style={[
                    styles.radioText,
                    { color: value == 'second' ? '#ffffff' : '#000000' },
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
            </RadioButton.Group>
            {value == 'second' && (
              <>
                <Text style={[styles.label, { marginBottom: 20 }]}>
                  Do you drink alcoholic beverages.?
                </Text>
                <RenderDrinking
                  title="Pints of Beer"
                  quantity={beer}
                  setter={setBeer}
                  iconLeft={
                    <FontAwesome
                      name={'beer'}
                      size={responsiveFontSize(24)}
                      color={GlobalColors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Add={
                    <FontAwesome5
                      name={'plus'}
                      size={responsiveFontSize(22)}
                      color={GlobalColors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Minus={
                    <FontAwesome5
                      name={'minus'}
                      size={responsiveFontSize(22)}
                      color={GlobalColors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                />
                <RenderDrinking
                  title="Glass of Wine"
                  quantity={wine}
                  setter={setWine}
                  iconLeft={
                    <FontAwesome5
                      name={'wine-glass-alt'}
                      size={responsiveFontSize(24)}
                      color={GlobalColors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Add={
                    <FontAwesome5
                      name={'plus'}
                      size={responsiveFontSize(22)}
                      color={GlobalColors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Minus={
                    <FontAwesome5
                      name={'minus'}
                      size={responsiveFontSize(22)}
                      color={GlobalColors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                />
                <RenderDrinking
                  title="Shots of Spirits"
                  quantity={spirits}
                  setter={setSpiritss}
                  iconLeft={
                    <MaterialCommunityIcons
                      name={'cup'}
                      size={responsiveFontSize(24)}
                      color={GlobalColors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Add={
                    <FontAwesome5
                      name={'plus'}
                      size={responsiveFontSize(22)}
                      color={GlobalColors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Minus={
                    <FontAwesome5
                      name={'minus'}
                      size={responsiveFontSize(22)}
                      color={GlobalColors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                />
              </>
            )}
          </ScrollView>
        </View>
        <ButtonWithShadowContainer
          onPress={() => handleDrinking()}
          title="Save"
        />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
};

export default Drinking;
