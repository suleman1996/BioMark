import React from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { RadioButton } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

import { TitleWithBackLayout } from 'components/layouts';
import { ActivityIndicator } from 'components';
import { ButtonWithShadowContainer } from 'components/base';

import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { userService } from 'services/user-service/user-service';
import { useSelector } from 'react-redux';

import makeStyles from './styles';

type RenderDrinkingProps = {
  title: string;
  quantity: number;
  setter: (value: number) => void;
  iconLeft: React.ReactNode;
  Add: React.ReactNode;
  Minus: React.ReactNode;
};

const Drinking = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const isFocus = useIsFocused();

  const [value, setValue] = React.useState('');
  const [beer, setBeer] = React.useState(0);
  const [wine, setWine] = React.useState(0);
  const [spirits, setSpiritss] = React.useState(0);
  const [isVisiable, setIsVisible] = React.useState(false);
  const [isDrinking, setIsDrinking] = React.useState(false);

  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);

  React.useEffect(() => {
    handleLifeStyle();
    // console.log('Bootstrap =======>', bootstrap);
  }, [isFocus, bootstrap]);

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
    <View style={styles.drinkingView}>
      <View
        style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}
      >
        <View style={{ width: 40, alignItems: 'center' }}>
          {props.iconLeft}
        </View>

        <Text
          style={{
            color: colors.darkPrimary,
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={isVisiable} />
      <TitleWithBackLayout title="Drinking">
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <ScrollView style={{ flex: 1, marginBottom: 100 }}>
            <Text style={styles.label}>
              {
                bootstrap?.attributes?.medical_template?.drinking[0]?.content
                  ?.fields[0]?.question
              }
            </Text>
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
                <RadioButton.Android
                  color={value == 'first' ? colors.white : null}
                  value="first"
                />
                <Text
                  style={[
                    styles.radioText,
                    { color: value == 'first' ? '#ffffff' : '#000000' },
                  ]}
                >
                  {
                    bootstrap?.attributes?.medical_template?.drinking[0]
                      ?.content?.fields[0]?.options[0]
                  }
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
                <RadioButton.Android
                  color={value == 'second' ? colors.white : null}
                  value="second"
                />
                <Text
                  style={[
                    styles.radioText,
                    { color: value == 'second' ? '#ffffff' : '#000000' },
                  ]}
                >
                  {
                    bootstrap?.attributes?.medical_template?.drinking[0]
                      ?.content?.fields[0]?.options[1]
                  }
                </Text>
              </TouchableOpacity>
            </RadioButton.Group>
            {value == 'second' && (
              <>
                <Text style={[styles.label, { marginBottom: 20 }]}>
                  {
                    bootstrap?.attributes?.medical_template?.drinking[0]
                      ?.content?.fields[1]?.question
                  }
                </Text>
                <RenderDrinking
                  title={
                    bootstrap?.attributes?.medical_template?.drinking[0]
                      ?.content?.fields[1]?.options[0]
                  }
                  quantity={beer}
                  setter={setBeer}
                  iconLeft={
                    <FontAwesome
                      name={'beer'}
                      size={responsiveFontSize(24)}
                      color={colors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Add={
                    <FontAwesome5
                      name={'plus'}
                      size={responsiveFontSize(22)}
                      color={colors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Minus={
                    <FontAwesome5
                      name={'minus'}
                      size={responsiveFontSize(22)}
                      color={colors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                />
                <RenderDrinking
                  title={
                    bootstrap?.attributes?.medical_template?.drinking[0]
                      ?.content?.fields[1]?.options[1]
                  }
                  quantity={wine}
                  setter={setWine}
                  iconLeft={
                    <FontAwesome5
                      name={'wine-glass-alt'}
                      size={responsiveFontSize(24)}
                      color={colors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Add={
                    <FontAwesome5
                      name={'plus'}
                      size={responsiveFontSize(22)}
                      color={colors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Minus={
                    <FontAwesome5
                      name={'minus'}
                      size={responsiveFontSize(22)}
                      color={colors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                />
                <RenderDrinking
                  title={
                    bootstrap?.attributes?.medical_template?.drinking[0]
                      ?.content?.fields[1]?.options[2]
                  }
                  quantity={spirits}
                  setter={setSpiritss}
                  iconLeft={
                    <MaterialCommunityIcons
                      name={'cup'}
                      size={responsiveFontSize(24)}
                      color={colors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Add={
                    <FontAwesome5
                      name={'plus'}
                      size={responsiveFontSize(22)}
                      color={colors.blue}
                      style={{ marginRight: 10 }}
                    />
                  }
                  Minus={
                    <FontAwesome5
                      name={'minus'}
                      size={responsiveFontSize(22)}
                      color={colors.blue}
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
