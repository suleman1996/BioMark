import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import TitleWithBackLayout from '../../../../../../components/layouts/back-with-title';
import {ScrollView} from 'native-base';
import {Provider, Appbar, RadioButton} from 'react-native-paper';
import styles from './styles';
import {GlobalColors} from '../../../../../../utils/theme/globalColors';
import ButtonWithShadowContainer from '../../../../../../components/base/button-with-shadow-container';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalFonts} from '../../../../../../utils/theme/fonts';
import {responsiveFontSize} from '../../../../../../utils/functions/responsiveText';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {navigate} from '../../../../../../services/navRef';
import {Nav_Screens} from '../../../../../../navigation/constants';

type Props = {};

const Drinking = (props: Props) => {
  const [value, setValue] = React.useState('');
  const [beer, setBeer] = React.useState(0);
  const [wine, setWine] = React.useState(0);
  const [spirits, setSpiritss] = React.useState(0);

  const RenderDrinking = ({title, quantity, setter, icon, minus, add}) => (
    <View
      style={{
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
      }}>
      <View style={{width: '50%', flexDirection: 'row', alignItems: 'center'}}>
        <MaterialCommunityIcons
          name={icon}
          size={responsiveFontSize(22)}
          color={GlobalColors.darkPrimary}
          style={{marginRight: 10}}
        />
        <Text style={{color: GlobalColors.blue, fontFamily: GlobalFonts.light}}>
          {title}
        </Text>
      </View>
      <View
        style={{
          width: '50%',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => quantity > 0 && setter(quantity - 1)}
          style={{marginRight: 10}}>
          <AntDesignIcon
            name={minus}
            size={responsiveFontSize(24)}
            color={GlobalColors.darkPrimary}
          />
        </TouchableOpacity>
        <Text>{quantity}</Text>
        <TouchableOpacity
          onPress={() => setter(quantity + 1)}
          style={{marginLeft: 10}}>
          <AntDesignIcon
            name={add}
            size={responsiveFontSize(24)}
            color={GlobalColors.darkPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TitleWithBackLayout title="Drinking">
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <ScrollView style={{flex: 1, marginBottom: 100}}>
            <Text style={styles.label}>Do you drink alcoholic beverages.?</Text>
            <RadioButton.Group
              onValueChange={newValue => {
                setValue(newValue);
              }}
              value={value}>
              <View
                style={[
                  styles.radioContainer,
                  {backgroundColor: value === 'first' ? '#054E8B' : null},
                ]}>
                <RadioButton
                  color={value == 'first' ? GlobalColors.white : null}
                  value="first"
                />
                <Text
                  style={[
                    styles.radioText,
                    {color: value == 'first' ? '#ffffff' : '#000000'},
                  ]}>
                  No
                </Text>
              </View>

              <View
                style={[
                  styles.radioContainer,
                  {backgroundColor: value == 'second' ? '#054E8B' : null},
                ]}>
                <RadioButton
                  color={value == 'second' ? GlobalColors.white : null}
                  value="second"
                />
                <Text
                  style={[
                    styles.radioText,
                    {color: value == 'second' ? '#ffffff' : '#000000'},
                  ]}>
                  Yes
                </Text>
              </View>
            </RadioButton.Group>
            {value == 'second' && (
              <>
                <Text style={[styles.label, {marginBottom: 20}]}>
                  Do you drink alcoholic beverages.?
                </Text>
                <RenderDrinking
                  title="Point of Beer"
                  quantity={beer}
                  setter={setBeer}
                  icon="beer"
                  add="plus"
                  minus="minus"
                />
                <RenderDrinking
                  title="Glass of Wine"
                  quantity={wine}
                  setter={setWine}
                  icon="glass-wine"
                  add="plus"
                  minus="minus"
                />
                <RenderDrinking
                  title="Shots of Spirits"
                  quantity={spirits}
                  setter={setSpiritss}
                  icon="glass-pint-outline"
                  add="plus"
                  minus="minus"
                />
              </>
            )}
          </ScrollView>
        </View>
        <ButtonWithShadowContainer
          onPress={() => navigate(Nav_Screens.Edit_Profile)}
          title="Save"
        />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
};

export default Drinking;
